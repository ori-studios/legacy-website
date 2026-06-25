                const videos = ["GWgfnSme_L4", "REm3hyA4D_s", "ipI41GVSwBs", "sgNrAGMPurA"];
                let current = 0;

                const clickSound = new Audio("sounds/press.wav");

                document.querySelectorAll('.mc-button').forEach(function(btn) {
                    var link = btn.closest('a');
                    if (!link) return;
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        playClick();
                        var href = this.href;
                        setTimeout(function() { window.location.href = href; }, 150);
                    });
                });

                function playClick() {
                    clickSound.currentTime = 0;
                    clickSound.play();
                }

                function updateVideo() {
                    document.getElementById("ytPlayer").src = "https://www.youtube.com/embed/" + videos[current];
                }

                function nextVideo() {
                    playClick();
                    current = (current + 1) % videos.length;
                    updateVideo();
                }

                function prevVideo() {
                    playClick();
                    current = (current - 1 + videos.length) % videos.length;
                    updateVideo();
                }