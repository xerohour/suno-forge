from playwright.sync_api import sync_playwright

def verify_studio_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile viewport
        context = browser.new_context(viewport={"width": 430, "height": 932})
        page = context.new_page()

        try:
            print("Navigating to Studio...")
            page.goto("http://localhost:3000/studio")
            page.wait_for_selector("h1:has-text('Studio')")

            # Attributes Check
            print("Checking attributes...")
            back_btn = page.locator("a[aria-label='Back to Home']")
            if back_btn.count() > 0:
                print("✅ Back button with correct aria-label found.")
            else:
                print("❌ Back button missing.")

            complexity = page.locator("#complexity-slider")
            val_text = complexity.get_attribute("aria-valuetext")
            print(f"Complexity valuetext: {val_text}")

            # Focus Toggle
            print("Focusing Experimental Toggle...")
            toggle = page.locator("#experimental-toggle")
            toggle.focus()

            # Scroll to make sure it's in view
            toggle.scroll_into_view_if_needed()

            # Screenshot the toggle DIV (the visual part)
            # The div is the next sibling of the input
            toggle_visual = page.locator("#experimental-toggle + div")
            if toggle_visual.is_visible():
                toggle_visual.screenshot(path="studio_toggle_visual.png")
                print("✅ Toggle visual screenshot captured.")
            else:
                print("❌ Toggle visual not visible.")

            # Full page screenshot for context
            page.screenshot(path="studio_full_page.png", full_page=True)
            print("Full page screenshot captured.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_studio_accessibility()
