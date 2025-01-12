// main.js

import "/src/view/start.scss";
import "/src/view/main.scss";
import "/src/view/img.scss";
import "/src/view/rwd.scss";

import { set_div, set_btn } from "/src/model/setting.js";

// 點擊開始
document.getElementById("click_to_start").addEventListener("click", () => {
    loadMain();
});
let golbal_arr = {
    now_scene: 0,
    now_end: 0,
};
const end_retry = createDiv("end_retry");

function loadMain() {

    // 顯示加載
    load_indicator(true);

    // 渲染主場內容
    const gameContainer = document.getElementById("game_container");
    gameContainer.innerHTML = "";
    const background = createDiv("background");
    const screen = createDiv("screen");
    const screen_border = createDiv("screen_border");
    const screen_bg = createDiv("screen_bg");
    const screen_cover = createDiv("screen_cover");
    const screen_ui = createDiv("screen_ui");
    const scene = createDiv("scene");
    const scene_ux = createDiv("scene_ux");
    const scene_bg = createDiv("scene_bg");
    
    scene.append(scene_bg, scene_ux);
    screen_bg.appendChild(scene);
    screen.append(screen_border, screen_bg, screen_cover, screen_ui, end_retry);
    screen.append(set_div, set_btn);
    gameContainer.append(background, screen);

    render_screen_direct();
    
    // 渲染主場樣式
    golbal_arr.now_scene = 1;
    loadScene();
};

// 載入場景器
function loadScene() {
    load_indicator(true);
    const scene_bg = document.querySelector("#scene_bg");
    let sceneCase = "";

    switch (golbal_arr.now_scene) {
    case 1:
        if (golbal_arr.now_end === 0) {
            sceneCase = import(`./s1`);
            scene_bg.className = "image_loader1";
        } else if (golbal_arr.now_end === 1) {

        } else {
            render_end(golbal_arr.now_end);
            return; // 避免進行圖片加載
        }
        break;
    default:
        render_end(3);
        break;
    }

    Promise.all([
        sceneCase,
        import('./controller')

    ]).then(async ([sceneModule, controllerModule]) => {
        // const { 
        //     s_data, s_lines, s_init,
        //     s_mechanic_line, s_hospital_line, 
        //     s_corpse_line, s_landscape_line, 
        // } = sceneModule;

        // 確保數據初始化完成
        await sceneModule.s_init();

        // console.log(sceneModule.s_data)
        if (!sceneModule.s_data) {
            console.error("s_data is undefined");
            return;
        }

        const { user, new_scene, next_scene_btn } = controllerModule;

        // 使用 scene1 數據來設置 user
        user.start_locat = sceneModule.start_locat;
        user.map = sceneModule.mapData;
        user.scene_arr = sceneModule.s_data;
        user.line_arr = sceneModule.s_lines;
        user.mechanic_line = sceneModule.s_mechanic_line;
        user.hospital_line = sceneModule.s_hospital_line;
        user.corpse_line = sceneModule.s_corpse_line;
        user.landscape_line = sceneModule.s_landscape_line;

        user.golbal_arr = golbal_arr;
        user.wall = 1;
        user.line_id = 0;

        // s_item.forEach(item => {
        //     if (!user.bag.includes(item)) {
        //         user.bag.push(item);
        //     }
        // });
        scene_bg.addEventListener("animationend", (event) => { // loading 結束
            if (event.animationName.includes("image_loader")) {
                scene_bg.className = "";
                load_indicator(false);    
                new_scene(user.now_end, sceneModule.s_data);
            };
        });

        // 重新開局
        end_retry.addEventListener("click", () => { 
        //     if (golbal_arr!!!!!.now_scene > 2) {
        //         golbal_arr!!!!!.now_scene = 2; // 這個可以再調整
        //     }
            // console.log(user.now_end, "end")
            golbal_arr.now_end = 0;
            load_indicator(false);  
            loadScene();  
            // MC_1.pause();
        });

        next_scene_btn.addEventListener("click", () => { 
            golbal_arr.now_scene = user.golbal_arr.now_scene;
            load_indicator(false);    
            loadScene();
        });

    }).catch(error => {
        console.error('Failed to load script:', error);
    });
};

// 加載神器
function load_indicator(show) {
    const indicator = document.getElementById("initializator");
    if (show) {
        indicator.style.display = "block";
    } else {
        indicator.style.display = "none";
    }
};

// 物件神器
function createDiv(nameId, nameClass, text) {
    const itemModel = document.createElement("div");
    if (nameId) { itemModel.id = nameId; }
    if (nameClass) { itemModel.className = nameClass; }
    if (text) { itemModel.textContent = text; }
    return itemModel;
};

// 寬高神器
function render_screen_direct() {
    
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // console.log(vw * 1.81 < vh)
    const screen = document.querySelector("#screen")
    if (vw * 1.9 < vh) { // 判斷寬度乘以1.8是否大於高度
        screen.className = 'screen_portrait';
    } else { // 不滿足條件時的處理
        screen.className = "screen_landscape";
    };
};
window.addEventListener('resize', render_screen_direct);
