window.addEventListener("scroll", () => {
                const bigTitle = document.querySelector(".minecraft-title");
                const smallTitle = document.querySelector(".top-title-small");

                if (window.scrollY > 100) {
                    bigTitle.style.opacity = "0";
                    smallTitle.style.opacity = "1";
                } else {
                    bigTitle.style.opacity = "1";
                    smallTitle.style.opacity = "0";
                }
            });

            function updateButtonPosition() {
                if (window.innerWidth <= 768) return;

                const title = document.querySelector(".minecraft-title");
                const buttonWrapper = document.querySelector(".title-button-wrapper");

                const titleRect = title.getBoundingClientRect();
                const pageCenterX = titleRect.left + titleRect.width / 2 + 35;

                buttonWrapper.style.left = pageCenterX + "px";
            }

            window.addEventListener("resize", updateButtonPosition);
            window.addEventListener("load", updateButtonPosition);