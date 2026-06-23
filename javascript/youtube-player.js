                const videos = ["GWgfnSme_L4", "REm3hyA4D_s", "ipI41GVSwBs", "sgNrAGMPurA"];
                let current = 0;

                function updateVideo() {
                    document.getElementById("ytPlayer").src = "https://www.youtube.com/embed/" + videos[current];
                }

                function nextVideo() {
                    current = (current + 1) % videos.length;
                    updateVideo();
                }

                function prevVideo() {
                    current = (current - 1 + videos.length) % videos.length;
                    updateVideo();
                }