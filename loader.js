document.addEventListener("DOMContentLoaded", () => {
    
    /**
     * Fetches an HTML component and injects it into a placeholder element.
     * It also finds and executes any <script> tags within the fetched HTML.
     * @param {string} componentPath - The path to the HTML file (e.g., 'navbar.html').
     * @param {string} placeholderId - The ID of the element to inject the component into.
     */
    const loadComponent = async (componentPath, placeholderId) => {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to fetch component: ${response.statusText}`);
            }
            const html = await response.text();
            const placeholder = document.getElementById(placeholderId);
            
            if (placeholder) {
                placeholder.innerHTML = html;

                // Scripts loaded via innerHTML don't execute by default.
                // We need to find them, create new script elements, and append them to run.
                const scripts = placeholder.querySelectorAll("script");
                scripts.forEach(oldScript => {
                    const newScript = document.createElement("script");
                    
                    // Copy attributes (like src)
                    Array.from(oldScript.attributes).forEach(attr => {
                        newScript.setAttribute(attr.name, attr.value);
                    });
                    
                    // Copy inline script content
                    newScript.textContent = oldScript.textContent;
                    
                    // Replace the old script tag with the new one to execute it
                    oldScript.parentNode.replaceChild(newScript, oldScript);
                });
            } else {
                console.warn(`Placeholder with ID '${placeholderId}' not found.`);
            }

        } catch (error) {
            console.error(`Error loading component from ${componentPath}:`, error);
        }
    };

    // Load the navbar and footer components
    loadComponent('navbar.html', 'navbar-placeholder');
    loadComponent('footer.html', 'footer-placeholder');
});