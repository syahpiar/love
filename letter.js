/* =========================================
   ONE-PAGE CONTROLLER
   INDEX -> LETTER -> GALLERY + ENDING
========================================= */

const openingSection =
    document.getElementById("openingSection");

const letterSection =
    document.getElementById("letterSection");

const gallerySection =
    document.getElementById("gallerySection");

const letterContent =
    document.getElementById("letterContent");

const letterEnding =
    document.getElementById("letterEnding");

const openBtn =
    document.getElementById("openBtn");

const nextBtn =
    document.getElementById("nextBtn");

const backBtn =
    document.getElementById("backBtn");


/* =========================================
   MUSIC
   Index benar-benar tidak memiliki audio.

   Audio baru dibuat saat Buka Surat ditekan.
   Audio dihapus saat Baca Lagi ditekan.
========================================= */

let music = null;


/* =========================================
   CREATE MUSIC
========================================= */

function createMusic() {

    /*
        Pastikan tidak ada audio lama.
    */

    removeMusic();


    /*
        Buat audio baru.
    */

    music =
        document.createElement("audio");


    music.src =
        "assets/music/song.mp3";

    music.loop =
        true;

    music.volume =
        0.7;

    music.preload =
        "auto";


    document.body.appendChild(
        music
    );


    /*
        Selalu mulai dari awal.
    */

    music.currentTime =
        0;


    /*
        Buka Surat adalah user gesture,
        sehingga browser mengizinkan play.
    */

    music.play().catch(() => {

        console.log(
            "Browser menunggu izin untuk memutar lagu."
        );

    });

}


/* =========================================
   REMOVE MUSIC
========================================= */

function removeMusic() {

    if (!music) {
        return;
    }


    /*
        Hentikan audio.
    */

    music.pause();


    /*
        Lepaskan sumber audio.
    */

    music.removeAttribute(
        "src"
    );


    music.load();


    /*
        Hapus elemen audio dari DOM.
    */

    music.remove();


    music = null;

}


/* =========================================
   SECTION SWITCH
========================================= */

function showOnly(section) {

    const sections = [
        openingSection,
        letterSection,
        gallerySection
    ];


    sections.forEach(current => {

        if (!current) {
            return;
        }


        if (current === section) {

            current.classList.remove(
                "hidden-section"
            );

            current.classList.add(
                "active-section"
            );

        }

        else {

            current.classList.remove(
                "active-section"
            );

            current.classList.add(
                "hidden-section"
            );

        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   OPEN LETTER
========================================= */

let letterStarted =
    false;


if (openBtn) {

    openBtn.addEventListener(
        "click",
        () => {

            /*
                Index:
                tidak ada audio.

                Saat Buka Surat:
                buat audio baru dari 0:00.
            */

            createMusic();


            /*
                Masuk ke Letter.
            */

            showOnly(
                letterSection
            );


            /*
                Surat dimuat sekali
                dalam sesi halaman ini.
            */

            if (!letterStarted) {

                letterStarted =
                    true;

                loadLetter();

            }

        }
    );

}


/* =========================================
   LOAD LETTER
========================================= */

function loadLetter() {

    if (!letterContent) {
        return;
    }


    let letterFile =
        "data/letter.txt";


    if (
        typeof CONFIG !== "undefined" &&
        CONFIG.letterFile
    ) {

        letterFile =
            CONFIG.letterFile;

    }


    fetch(letterFile)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Letter not found"
                );

            }

            return response.text();

        })

        .then(text => {

            typeWriter(text);

        })

        .catch(error => {

            console.error(error);

            letterContent.textContent =
                "Surat belum tersedia ❤️";

        });

}


/* =========================================
   TYPEWRITER
========================================= */

function typeWriter(text) {

    let index =
        0;


    letterContent.textContent =
        "";


    const speed =
        35;


    function typing() {

        /*
            Pastikan audio yang sama tetap berjalan.
            Tidak membuat audio baru.
        */

        if (
            music &&
            music.paused
        ) {

            music.play().catch(() => {});

        }


        if (
            index <
            text.length
        ) {

            letterContent.textContent +=
                text.charAt(index);


            index++;


            setTimeout(
                typing,
                speed
            );

        }

        else {

            showLetterEnding();

        }

    }


    typing();

}


/* =========================================
   LETTER SELESAI
========================================= */

function showLetterEnding() {

    if (!letterEnding) {
        return;
    }


    letterEnding.classList.add(
        "show"
    );

}


/* =========================================
   NEXT -> GALLERY
========================================= */

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        () => {

            /*
                Audio tetap sama.
                Tidak pause.
                Tidak reset.
            */

            showOnly(
                gallerySection
            );

        }
    );

}


/* =========================================
   BACA LAGI -> INDEX
========================================= */

if (backBtn) {

    backBtn.addEventListener(
        "click",
        () => {

            /*
                Hapus audio sepenuhnya.

                Index kembali dalam keadaan
                benar-benar bersih.
            */

            removeMusic();


            /*
                Kembali ke Index tanpa reload.
            */

            showOnly(
                openingSection
            );

        }
    );

}
