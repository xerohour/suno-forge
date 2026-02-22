from playwright.sync_api import sync_playwright

def verify_studio_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            print("Navigating to Studio...")
            page.goto("http://localhost:3000/studio")

            # Wait for content to load
            page.wait_for_selector("h1:has-text('Studio')")

            # 1. Verify Back Button
            print("Verifying Back Button...")
            back_link = page.get_by_role("link", name="Back to Home")
            if back_link.is_visible():
                print("✅ Back button with aria-label 'Back to Home' found.")
            else:
                print("❌ Back button not found or aria-label missing.")

            # 2. Verify Complexity Slider aria-valuetext
            print("Verifying Complexity Slider...")
            complexity_slider = page.locator("#complexity-slider")
            valuetext = complexity_slider.get_attribute("aria-valuetext")
            print(f"Complexity aria-valuetext: {valuetext}")

            if valuetext == "High": # Default is 82, so High
                 print("✅ Complexity slider has correct aria-valuetext.")
            else:
                 print(f"❌ Complexity slider has incorrect aria-valuetext: {valuetext}")

            # 3. Verify Toggle Focus
            print("Focusing Experimental Toggle...")
            toggle = page.locator("#experimental-toggle")
            toggle.focus()

            # Take screenshot of the mutation controls
            print("Taking screenshot...")
            controls_section = page.locator("section").filter(has_text="Mutation Controls")
            controls_section.screenshot(path="studio_verification.png")

            print("Verification complete. Screenshot saved to studio_verification.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_studio_accessibility()
