from playwright.sync_api import sync_playwright

def verify_studio_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Wider viewport to avoid cropping issues in screenshot logic if any
        context = browser.new_context(viewport={"width": 600, "height": 1000})
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

            # Take screenshot of the mutation controls specifically
            print("Taking screenshot of controls...")
            controls = page.locator("section").filter(has_text="Mutation Controls")
            controls.screenshot(path="studio_verification_v3.png")

            # Also take full page screenshot for context
            # page.screenshot(path="studio_full_v3.png", full_page=True)

            print("Verification complete.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_studio_accessibility()
