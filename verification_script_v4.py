from playwright.sync_api import sync_playwright

def verify_studio_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Standard desktop viewport to ensure layout is not cramped
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        try:
            print("Navigating to Studio...")
            page.goto("http://localhost:3000/studio")

            # Wait for content
            page.wait_for_selector("h1:has-text('Studio')")

            # Scroll down
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

            # Focus Toggle
            print("Focusing Experimental Toggle...")
            toggle = page.locator("#experimental-toggle")
            toggle.focus()

            page.wait_for_timeout(500)

            # Take screenshot of the toggle label
            print("Taking screenshot of toggle...")
            # The toggle input is inside a label. We want to screenshot the label or the div next to input.
            # The structure is label > input + div.
            # We can screenshot the label.
            toggle_label = page.locator("label:has(#experimental-toggle)")
            toggle_label.screenshot(path="studio_toggle_focus.png")

            print("Verification complete.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_studio_accessibility()
