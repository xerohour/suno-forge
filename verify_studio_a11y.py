from playwright.sync_api import sync_playwright

def test_studio_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            # Add a small wait to ensure server is up (or retry logic would be better but simple wait for now)
            # Actually playwright will wait for connection but if server isn't up it fails immediately.
            # I'll rely on the previous background command having had a second.
            page.goto("http://localhost:3000/studio")

            # 1. Verify Back Button ARIA label
            # Using a more robust selector to find the back button specifically in the header
            back_button = page.locator("header button").first
            aria_label = back_button.get_attribute("aria-label")
            assert aria_label == "Go back", f"Expected 'Go back', got '{aria_label}'"
            print("✅ Back button has correct aria-label")

            # 2. Verify Complexity Slider aria-valuetext
            slider = page.locator("#complexity-slider")

            # Check initial value (82 -> High)
            initial_valuetext = slider.get_attribute("aria-valuetext")
            assert initial_valuetext == "High", f"Expected 'High', got '{initial_valuetext}'"
            print("✅ Slider has correct initial aria-valuetext 'High'")

            # Change value to Medium (e.g., 50)
            # We need to trigger the change event. fill() works for input type=range in Playwright usually
            slider.fill("50")

            # Verify update
            medium_valuetext = slider.get_attribute("aria-valuetext")
            assert medium_valuetext == "Medium", f"Expected 'Medium', got '{medium_valuetext}'"
            print("✅ Slider has correct aria-valuetext 'Medium' after update")

            # Change value to Low (e.g., 20)
            slider.fill("20")
            low_valuetext = slider.get_attribute("aria-valuetext")
            assert low_valuetext == "Low", f"Expected 'Low', got '{low_valuetext}'"
            print("✅ Slider has correct aria-valuetext 'Low' after update")

        except Exception as e:
            print(f"❌ Test failed: {e}")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    test_studio_accessibility()
