<html lang="en">

<head>

    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width,maximum-scale=1.0,minimum-scale=1.0'>
        <meta http-equiv='X-UA-Compatible' content='ie=edge'>
        <title>国庆头像制作</title>
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="./index.css">
    </head>

<body>
    <div class="wrapper">
        <!-- 选择框 -->
        <div class="main-box">
            <a class="prev" onClick='changeHat()'></a>
            <div class="main-img">
                <div id="content">
                    <canvas id='cvs'></canvas>
                </div>
            </div>
            <a class="next" onClick='changeHat()'></a>
        </div>
        <!-- 导出图 -->
        <img id='export-img' alt='国庆专属头像' src='' crossorigin="anonymous" />
        <!-- 操作按钮 -->
        <div class="operation-btns">
            <a class="upload-btn">
                <input id='upload' type='file' onchange='viewer()' style='opacity: 0;' />
            </a>
            <a class="export-btn" onClick='exportFunc()'></a>
        </div>
    </div>
    <div style='display: none'>
        <img id='img' src='' alt='' />
        <img class='hide' id='hat0' src='./img/1.png' />
        <img class='hide' id='hat1' src='./img/2.png' />
        <img class='hide' id='hat2' src='./img/3.png' />
        <img class='hide' id='hat3' src='./img/4.png' />
        <img class='hide' id='hat4' src='./img/5.png' />
        <img class='hide' id='hat5' src='./img/6.png' />
        <img class='hide' id='hat6' src='./img/7.png' />
    </div>
    <script src="https://cdn.bootcdn.net/ajax/libs/fabric.js/451/fabric.min.js"></script>
    <script src="http://danml.com/js/download.js"></script>

    <script>
        let canvasFabric;
        let hat = "hat0";
        let hatInstance;
        const screenWidth = document.getElementById("content").scrollHeight;

        function viewer() {
            const file = document.getElementById("upload").files[0];
            const img = document.getElementById("img");
            var reader = new FileReader;
            if (file) {
                reader.readAsDataURL(file);
                reader.onload = () => {
                    img.src = reader.result;
                    img.onload = () => img2Cvs(img);
                }
            } else {
                img.src = ""
            }
        }
        function img2Cvs(img) {
            const cvs = document.getElementById("cvs");
            cvs.width = img.width;
            cvs.height = img.height;
            cvs.style.display = "block";
            canvasFabric = new fabric.Canvas("cvs", {
                width: screenWidth,
                height: screenWidth,
                backgroundImage: new fabric.Image(img, {
                    scaleX: screenWidth / img.width,
                    scaleY: screenWidth / img.height
                })
            });
            changeHat();
            console.log(canvasFabric, hatInstance)
            document.getElementsByClassName("upload-btn")[0].style.display = "none";
            document.getElementsByClassName("export-btn")[0].style.display = "block";
        }
        function changeHat() {
            document.getElementById(hat).style.display = "none";
            var hats = document.getElementsByClassName("hide");
            hat = "hat" + (+hat.replace("hat", "") + 1) % hats.length;
            var hatImage = document.getElementById(hat);
            hatImage.style.display = "block";
            if (hatInstance) {
                canvasFabric.remove(hatInstance)
            }
            hatInstance = new fabric.Image(hatImage, {
                top: 0,
                left: 0,
                scaleX: screenWidth / hatImage.width,
                scaleY: screenWidth / hatImage.height,
                cornerColor: "#0b3a42",
                cornerStrokeColor: "#fff",
                cornerStyle: "circle",
                transparentCorners: false,
                rotatingPointOffset: 30
            });
            hatInstance.setControlVisible({
                mt: false,
                mb: false,
                ml: false,
                mr: false,
                bl: false,
                br: false,
                tl: false,
                tr: false,
                mtr: false,
            })
            canvasFabric.add(hatInstance);
        }
        function exportFunc() {
            document.getElementsByClassName("main-box")[0].style.display = "none";
            document.getElementsByClassName("operation-btns")[0].style.display = "none";
            document.getElementById("cvs").style.display = "none";

            const exportImage = document.getElementById("export-img");
            exportImage.style.display = "block";
            exportImage.src = canvasFabric.toDataURL({
                width: screenWidth,
                height: screenWidth
            });
            confirm("是否下载头像") ? download(exportImage.src, "国庆风头像", 'image/png') : void 0
        }
    </script>
</body>

</html>










body,
html {
    min-height: 100%;
    width: 100%;
    user-select: none;
    font-size: 18px;
}

#export-img {
    display:none;
    margin:0 auto;
    width:250px;
    height:250px;
}

.wrapper {
    width: 100%;
    height: 100%;
    max-width: 620px;
    max-height: 800px;
    margin: 0 auto;
    /* background-image: url('../img/bg.png'); */
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-top: 13em;
}

.main-box {
    display: flex;
    align-items: center;
    justify-content: center;
}

.main-box .next,
.main-box .prev {
    background-image: url('./img/next.png');
    background-size: contain;
    border-radius: 50%;
    width: 2.275rem;
    height: 2.275rem
}

.main-box .prev {
    transform: rotate(180deg)
}

.main-box .main-img {
    margin: 0 .75rem;
    background: #fff;
    border: .25rem solid #fbe6b5;
    border-radius: .75rem;
    font-size: 0
}

#content {
    border-radius: .5rem;
    position: relative;
    width: 9.5rem;
    height: 9.5rem;
    margin-left: 50%;
    transform: translateX(-50%);
    overflow: hidden
}

.operation-btns {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: .75rem
}

.operation-btns .upload-btn {
    width: 11.6rem;
    height: 3.6rem;
    background-size: 100% 100%;
    background-image: url('./img/upload.png')
}

.operation-btns .export-btn {
    display: none;
    width: 11.6rem;
    height: 3.75rem;
    background-size: 100% 100%;
    background-image: url('./img/export.png')
}
