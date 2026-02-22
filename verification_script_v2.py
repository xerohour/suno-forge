from playwright.sync_api import sync_playwright

def verify_studio_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a mobile viewport as per the app design (max-w-[430px])
        context = browser.new_context(viewport={"width": 430, "height": 932})
        page = context.new_page()

        try:
            print("Navigating to Studio...")
            page.goto("http://localhost:3000/studio")

            # Wait for content to load
            page.wait_for_selector("h1:has-text('Studio')")

            # Scroll to bottom to ensure toggle is visible
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

            # 3. Verify Toggle Focus
            print("Focusing Experimental Toggle...")
            toggle = page.locator("#experimental-toggle")
            toggle.focus()

            # Wait a bit for focus styles to render
            page.wait_for_timeout(500)

            # Take screenshot of the mutation controls
            print("Taking screenshot...")
            controls_section = page.locator("section").filter(has_text="Mutation Controls")
            controls_section.screenshot(path="studio_verification_v2.png")

            print("Verification complete. Screenshot saved to studio_verification_v2.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_studio_accessibility()
