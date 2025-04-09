<?php
function isActive($page) {
    return basename($_SERVER['PHP_SELF']) === $page ? 'bg-indigo-100 text-indigo-500' : '';
}

function isMapActive() {
    $current = basename($_SERVER['PHP_SELF']);
    return ($current === 'incidents.php' || $current === 'hazards.php');
}
?>

<!-- <div class="relative"> -->
    <!-- Sidebar -->
    <aside id="sidebar" class="overflow-y-auto bg-[#F7F7F7] flex flex-col transition-all duration-300 ease-in-out w-[342px]">
        
        <!-- Top Section-->
        <div>
            <!-- Responsys Logo -->
            <div class="flex items-center w-full p-3 gap-3 sidebar-section transition-all duration-300">
                <div class="bg-[#D9D9D9] w-[56px] h-[56px] rounded-full shrink-0 flex items-center justify-center overflow-hidden"></div>
                <div class="sidebar-content transition-all duration-300">
                    <p class="font-semibold text-xl">Responsys</p>
                    <p class="font-normal text-xs">Web App</p>
                </div>
            </div>

            <!-- Profile -->
            <div class="profile-section flex items-center p-3 gap-3 w-full max-w-[304px] h-[74px] ring-1 ring-[#DDDDDD] rounded-xl mx-auto mt-8 mb-5 sidebar-section transition-all duration-300 justify-start">
                <div class="bg-[#D9D9D9] w-[43px] h-[43px] rounded-full overflow-hidden shrink-0">
                    <img src="images/sir-loyd.png" alt="">
                </div>
                <div class="sidebar-content transition-all duration-300 w-full">
                    <p class="font-normal text-[17px]">Loyd Anthony C. Driz</p>
                    <p class="font-normal text-xs text-[#6E6E6E]">loyddriz@gmail.com</p>
                </div>
                <div class="ml-auto cursor-pointer sidebar-content transition-all duration-300">
                    <i class="fa-solid fa-caret-down w-6 h-6" id="caret"></i>
                </div>
            </div>

            <!-- Menu Items -->
            <a href="dashboard.php" class="w-full no-underline">
                <div class="flex p-4 gap-3 items-center w-full max-w-[304px] h-[44px] rounded-xl mx-auto menu-section hover:bg-indigo-100 hover:text-indigo-500 active:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-200 <?php echo isActive('dashboard.php'); ?>">
                    <i class="fa-solid fa-chart-line"></i>
                    <span class="font-normal text-[15px] sidebar-content w-full max-w-[304px]">Dashboard</span>
                </div>
            </a>

            <div class="flex p-4 gap-3 items-center w-full max-w-[304px] h-[44px] rounded-xl mx-auto menu-section hover:bg-indigo-100 hover:text-indigo-500 active:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-200 
            <?php echo isMapActive() ? 'bg-indigo-100 text-indigo-500' : ''; ?>" id="maps-menu">                
                <i class="fa-solid fa-location-dot"></i>
                <p class="font-normal text-[15px] sidebar-content">Maps</p>
                <div class="ml-auto cursor-pointer sidebar-content" id="maps-dropdown-icon">
                    <i class="fa-solid fa-caret-down w-6 h-6" id="caret2"></i>
                </div>
            </div>

            <!-- Dropdown -->
            <div id="dropdown-content" class="max-h-0 overflow-hidden bg-gray-200 rounded-xl w-full max-w-[304px] mx-auto transition-all duration-500 ease-in-out">
                <div class="bg-gray-200">
                    <a href="incidents.php" class="w-full no-underline">
                        <div class="flex gap-3 p-4 items-center hover:bg-indigo-100 hover:text-indigo-500 active:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-300 menu-section
                        <?php echo isActive('incidents.php'); ?>" style="padding-left: 35px !important; margin-bottom: 10px !important;">
                            <i class="fa-solid fa-map-location-dot"></i>
                            <span class="font-normal text-[15px] w-full max-w-[304px]">Incident Map</span>
                        </div>
                    </a>

                    <div class="flex gap-3 p-4 items-center hover:bg-indigo-100 hover:text-indigo-500 active:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-300 menu-section
                    <?php echo isActive('hazards.php'); ?>" style="padding-left: 35px !important; margin-bottom: 0px !important;">
                        <i class="fa-solid fa-exclamation-circle"></i>
                        <p class="font-normal text-[15px]">Hazard Map</p>
                    </div>
                </div>
            </div>

            <!-- Manage Divider -->
            <div class="flex p-4 gap-3 items-center w-full max-w-[304px] h-[44px] rounded-xl mx-auto manage-divider">
                <p class="text[17px] text-gray-400">Manage</p>
                <div class="flex-grow border-t border-gray-300"></div>
            </div>

            <div class="flex p-4 gap-3 items-center w-full max-w-[304px] h-[44px] rounded-xl mx-auto menu-section hover:bg-indigo-100 hover:text-indigo-500 active:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-200">
                <i class="fa-solid fa-magnifying-glass-chart"></i>
                <p class="font-normal text-[15px] sidebar-content">Manage Incident Reports</p>
            </div>
            
            <div class="flex p-4 gap-3 items-center w-full max-w-[304px] h-[44px] rounded-xl mx-auto menu-section hover:bg-indigo-100 hover:text-indigo-500 active:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-200">
                <i class="fa-solid fa-house-circle-exclamation"></i>
                <p class="font-normal text-[15px] sidebar-content">Manage Hazards</p>
            </div>

            <div class="flex p-4 gap-3 items-center w-full max-w-[304px] h-[44px] rounded-xl mx-auto menu-section hover:bg-indigo-100 hover:text-indigo-500 active:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-200">
                <i class="fa-solid fa-users"></i>
                <p class="font-normal text-[15px] sidebar-content">Manage Accounts</p>
            </div>
        </div>

        <!-- Spacer to maintain consistent spacing -->
        <div class="h-6 shrink-0 menu-section"></div> <!-- Adjust height to taste -->

        <!-- Bottom Section -->
        <div class="flex flex-col mt-auto">
            <!-- Settings -->
            <div class="flex p-4 gap-3 items-center w-full max-w-[304px] h-[44px] rounded-xl mx-auto menu-section 
                hover:bg-indigo-100 hover:text-indigo-500 active:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-200">
                <i class="fa-solid fa-gear"></i>
                <p class="font-normal text-[15px] sidebar-content">Settings</p>
            </div>

            <!-- Logout -->
            <div class="flex p-4 gap-3 items-center w-full max-w-[304px] h-[44px] rounded-xl mx-auto menu-section
                hover:bg-indigo-100 hover:text-indigo-500 active:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-200">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <p class="font-normal text-[15px] sidebar-content">Logout</p>
            </div>
        </div>
    </aside>
    
    <button id="sidebar-toggle"
        class="absolute top-[26px] left-[342px] w-10 h-10 rounded-full bg-white text-gray-600 hover:text-black shadow-md z-50 flex items-center justify-center transition-all duration-300 ease-in-out"
        style="transform: translateX(-50%) translateY(-10px);">
        <i id="sidebar-icon" class="fa-solid fa-angle-left text-lg"></i>
    </button>
<!-- </div> -->

<script>
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const sidebarIcon = document.getElementById("sidebar-icon");
    const sidebarContent = document.querySelectorAll(".sidebar-content");

    const mapsMenu = document.getElementById("maps-menu");
    const dropdownContent = document.getElementById("dropdown-content");
    const caretIcon2 = document.getElementById("caret2");

    const profileCaret = document.getElementById("caret");
    const profileDropdownToggle = profileCaret?.parentElement;

    let isSidebarOpen = true;
    let isDropdownOpen = false;

    // Hover-based sidebar expansion (only when collapsed)
    let hoverOpenTimeout;

    sidebar.addEventListener("mouseenter", () => {
        if (!isSidebarOpen) {
            hoverOpenTimeout = setTimeout(() => {
                sidebarToggle.click(); // Trigger sidebar toggle
            }, 400); // Delay in ms (adjust as needed)
        }
    });

    sidebar.addEventListener("mouseleave", () => {
        clearTimeout(hoverOpenTimeout);
    });

    sidebarToggle.addEventListener("click", () => {
        isSidebarOpen = !isSidebarOpen;

        if (isSidebarOpen) {
            sidebar.classList.remove("w-[80px]");
            sidebar.classList.add("w-[342px]", "overflow-x-hidden");
            sidebarToggle.style.left = "342px";
            sidebarIcon.classList.replace("fa-angle-right", "fa-angle-left");

            // Show all content (sidebar)
            sidebarContent.forEach(el => el.classList.remove("hidden"));

            // Adjust profile section width when sidebar is open
            document.querySelectorAll(".profile-section").forEach(el => {
                el.classList.remove("w-[43px]");
                el.classList.add("max-w-[304px]");
                el.classList.add("ring-1", "ring-[#DDDDDD]");
                el.classList.remove("py-1");
                el.classList.add("py-3");
            });

            // Adjust sidebar-section when sidebar is open
            document.querySelectorAll(".sidebar-section").forEach(el => {
                el.classList.remove("w-[80px]");
                el.classList.add("w-[342px]");  // Full width when sidebar is open
                el.classList.remove("justify-center");
                el.classList.add("justify-start");
            });

            // Adjust menu items' width and content when sidebar is open
            document.querySelectorAll(".menu-section").forEach(el => {
                el.classList.remove("w-[80px]");
                el.classList.add("w-[304px]");  // Full width when sidebar is open
                el.classList.remove("justify-center");
                el.classList.add("justify-start");
            });

            // Show text labels for menu items
            document.querySelectorAll(".sidebar-content").forEach(el => {
                el.classList.remove("hidden");
            });

            // Show Manage Divider when sidebar is open
            const manageDivider = document.querySelector(".manage-divider");
            if (manageDivider) {
                manageDivider.classList.remove("hidden");
                // console.log("Manage divider is shown");
            }

            document.querySelectorAll(".sidebar-section, .menu-section, .profile-section").forEach(el => {
                el.classList.remove("w-[100%]"); // Remove 100% width when open
                el.classList.add("w-[304px]");  // Adjust to desired width when open (use whatever width you need)
            });

        } else {
            sidebar.classList.remove("w-[342px]");
            sidebar.classList.add("w-[80px]", "overflow-x-hidden");
            sidebarToggle.style.left = "80px";
            sidebarIcon.classList.replace("fa-angle-left", "fa-angle-right");

            // Hide all content (sidebar)
            sidebarContent.forEach(el => el.classList.add("hidden"));

            // Adjust profile section width when sidebar is closed
            document.querySelectorAll(".profile-section").forEach(el => {
                el.classList.remove("max-w-[304px]");
                el.classList.add("w-[43px]");  // Set to the profile image width
                el.classList.remove("py-3");
                el.classList.remove("ring-1", "ring-[#DDDDDD]");
                el.classList.add("py-1");
            });

            // Adjust sidebar-section when sidebar is closed
            document.querySelectorAll(".sidebar-section").forEach(el => {
                el.classList.remove("w-[342px]");
                el.classList.add("w-[80px]");  // Reduce width when sidebar is closed
                el.classList.remove("justify-start");
                el.classList.add("justify-center");
            });

            // Adjust menu items' width and content when sidebar is closed
            document.querySelectorAll(".menu-section").forEach(el => {
                el.classList.remove("w-[304px]");
                el.classList.add("w-[80px]");  // Reduce width when sidebar is closed
                el.classList.remove("justify-start");
                el.classList.add("justify-center");
            });

            // Hide text labels for menu items
            document.querySelectorAll(".sidebar-content").forEach(el => {
                el.classList.add("hidden");
            });

            // Show Manage Divider when sidebar is open
            const manageDivider = document.querySelector(".manage-divider");
            if (manageDivider) {
                manageDivider.classList.add("hidden");
                // console.log("Manage divider is shown");
            }

            // Set 100% width for sections when sidebar is closed
            document.querySelectorAll(".sidebar-section, .menu-section, .profile-section").forEach(el => {
                el.classList.remove("w-[304px]"); // Remove original width when closed
                el.classList.add("w-[100%]");    // Set width to 100% when collapsed
            });

            // Collapse maps dropdown
            dropdownContent.classList.remove("max-h-[200px]");
            dropdownContent.classList.add("max-h-0");
            dropdownContent.classList.remove("mb-4");
            caretIcon2.classList.replace("fa-caret-up", "fa-caret-down");
            caretIcon2.classList.add("hidden");
            profileCaret?.classList.replace("fa-caret-up", "fa-caret-down");

            isDropdownOpen = false;
        }
    });

    // Check if we're on a map page
    const isMapPage = window.location.pathname.includes('incidents.php') || 
                     window.location.pathname.includes('hazards.php');

    // Initialize dropdown state based on current page
    if (isMapPage && isSidebarOpen) {
        dropdownContent.classList.remove("max-h-0");
        dropdownContent.classList.add("max-h-[200px]", "mb-4");
        caretIcon2.classList.remove("fa-caret-down");
        caretIcon2.classList.add("fa-caret-up");
        isDropdownOpen = true;
    }

    // Modified click outside handler
    document.addEventListener("click", function (event) {
        if (!mapsMenu.contains(event.target) && 
            !dropdownContent.contains(event.target) && 
            isDropdownOpen) {
            dropdownContent.classList.remove("max-h-[200px]", "mb-4");
            dropdownContent.classList.add("max-h-0");
            caretIcon2.classList.remove("fa-caret-up");
            caretIcon2.classList.add("fa-caret-down");
            isDropdownOpen = false;
        }
    });
const caretPath = document.getElementById("caretPath");
    mapsMenu.addEventListener("click", () => {
        if (!isSidebarOpen) return;

        isDropdownOpen = !isDropdownOpen;

        if (isDropdownOpen) {
            dropdownContent.classList.remove("max-h-0");
            dropdownContent.classList.add("max-h-[200px]");
            dropdownContent.classList.add("mb-4"); // Add margin when the dropdown is open
            caretIcon2.classList.remove("fa-caret-down");
            caretIcon2.classList.add("fa-caret-up");
            // Flip the SVG to "up"
        caretPath.setAttribute("d", "M14.77 12.79a.75.75 0 01-1.06-.02L10 8.707l-3.71 4.06a.75.75 0 11-1.08-1.04l4.25-4.667a.75.75 0 011.08 0l4.25 4.667a.75.75 0 01-.02 1.06z");
        } else {
            dropdownContent.classList.remove("max-h-[200px]");
            dropdownContent.classList.add("max-h-0");
            dropdownContent.classList.remove("mb-4"); // Add margin when the dropdown is open
            caretIcon2.classList.remove("fa-caret-up");
            caretIcon2.classList.add("fa-caret-down");
                    // Flip the SVG back to "down"
        caretPath.setAttribute("d", "M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.667a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z");
        }
    });

    profileDropdownToggle?.addEventListener("click", () => {
        if (profileCaret.classList.contains("fa-caret-down")) {
            profileCaret.classList.remove("fa-caret-down");
            profileCaret.classList.add("fa-caret-up");
        } else {
            profileCaret.classList.remove("fa-caret-up");
            profileCaret.classList.add("fa-caret-down");
        }
    });
</script>

<script>
    // Select all menu items
    const menuItems = document.querySelectorAll(".menu-section");

    // Function to handle the active state toggle
    function handleActiveState(event) {
        // Remove active class from all menu items
        menuItems.forEach(item => {
            item.classList.remove("bg-indigo-100", "text-indigo-500");
        });

        // Add active class to the clicked item
        event.currentTarget.classList.add("bg-indigo-100", "text-indigo-500");
    }

    // Add event listeners for click events on all menu items
    menuItems.forEach(item => {
        item.addEventListener("click", handleActiveState);
    });
</script>