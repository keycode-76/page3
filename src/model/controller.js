// controller.js
// import { SD_1, SD_2, SD_3, SD_4, SD_5, SD_6, SD_7, SD_8, SD_9,
//     MC_2 } from "./sound";

// 極致設計
// 少即是多
// 增加一倍或是減半
// 將核心玩法或參數調到極致 來測試遊戲

// 負反饋 (動腦 壓力 目的:挑戰成功的快感)
// 死亡懲罰 物品掉一半
// 孤獨與迫切逃離的感覺

// 敵人攻擊模式 (動腦 複雜 目的:戲耍對手的快感)
// 可以看到敵人下一回合動作
// 將軍對決 固定攻擊模式 比如砍了再往前走 走了再砍
// 敵人目前只有攻擊球 
// 可以在某個回合有自爆球
// 絕對攻擊

// 正反饋 (蒐集 準備 目的:自身實力增長的爽感 安心感)
// 局外成長系統
// 血量遞增 攻擊防禦能力加成
// 金幣攜帶
// 復活能力
// 血瓶上限
// 基地建設

export {
    user, next_scene_btn,
    new_scene, new_line,
    render_ux, click_ux,
};

// USER DATA -------------------------------------------------------
let user = {
    now_end: 0,
    start_locat:{},
    ends_collect: {},
    golbal_arr: {}, //按鈕提示等文字

    map: [],
    scene_arr: {}, //整個劇情資料庫
    line_arr: [],
    mechanic_line: [],
    hospital_line: [],
    corpse_line: [],

    last_scene_index: 0, // 上個畫面指數
    line_id: 0, // 一段話id
    line_length: 0, // 對話次數長度
    line_rp: [], // 現在場景所有話

    wall: 1, // 房間的四牆面
    now_scene_data: {}, // 場景資料
    sceneIndex: 0, // 場景指數
    now_click_data: {}, // 物品資料

    heart: 20, // 血量
    sanity: 2, // 散質
    heart_limit: 30, // 血量上限
    sanity_limit: 2, // 理智上限

    money: 20, // 玩家錢包
    bag_space: 10, // 包包容量
    inventory_space: 20, // 儲物箱
    trust: {
        "base":300,
        "mechanic":0,
        "cook":0,
        "painter":0,
    },
    bag:[
        { name: "Meat_soup", quantity: 5 },
        { name: "Flint_stone", quantity: 3 },
        { name: "Bone_piece", quantity: 3 },
        { name: "Raw_meat", quantity: 1 },
        { name: "Raw_meat", quantity: 5 },
        { name: "Raw_meat", quantity: 2 },
    ],
    album:[
        { name: "Entrance"},
        { name: "Team_leader"},
    ],
    enemy: { //敵人
        heart: 0, // 血量
        harm: 0, // 筆記總傷害

        neft_burn: 0, 
        nerf_infect: 0, 
        nerf_phonophobia: 0, 
        buff_carapace: 0, 
        buff_flexibility: 0, 
        buff_anger: 0, 
    },
    weapon_feature: { // 彈藥效果
        Parasite_bullet: 1, 
        Glare_bullet: 1, 
        Corrosion_bullet: 1, 
        // Descaling_bullet: 1, 
        // Devour_bullet: 1, 
        // Thump_bullet: 2, 
        // Camo_liquid_protect: 2, 
        // Camo_liquid_sanity: 1, 
    },
};

import items_data from '/src/data/items.json';
import { user_language, language_array } from "/src/model/setting.js";
// 要放進JSON

// 基地
const screen = document.querySelector("#screen");
const screen_bg = document.querySelector("#screen_bg");
const scene_bg = document.querySelector("#scene_bg");
const scene_ux = document.querySelector("#scene_ux");
const screen_cover = document.querySelector("#screen_cover");
const screen_ui = document.querySelector("#screen_ui");
const pop_note = createDiv("pop_note");
const next_scene_btn = createDiv("next_scene_btn");

// 結局
const end_div = createDiv("end_div");
const end_img = createDiv("end_img");
const end_label = createDiv("end_label");
const end_retry = document.querySelector("#end_retry");
end_div.append(end_img, end_label, end_retry);

// 對話區
const lines_div = createDiv("lines_div");
const lines_name = createDiv("lines_name");
const lines_text = createDiv("lines_text");
const lines_btn = createDiv("lines_btn");
const lines_pass_btn = createDiv("lines_pass_btn");
let now_trader; // 商人 NPC enemy boss 名子
let passTimer; // 跳過計時器

// 地圖
const user_locate_div = createDiv("user_locate_div");
const mini_map_div = createDiv("mini_map_div");
const user_map_compass = createDiv("user_map_compass");
const map_tile_container = createDiv("map_tile_container");
const mini_map_padder = createDiv("mini_map_padder");

const full_map_div = createDiv("full_map_div");
const full_map_padder = createDiv("full_map_padder");
const map_compress_div = createDiv("map_compress_div");
const map_compress_N = createDiv("map_compress_N", "map_compresses");
const map_compress_E = createDiv("map_compress_E", "map_compresses");
const map_compress_S = createDiv("map_compress_S", "map_compresses");
const map_compress_W = createDiv("map_compress_W", "map_compresses");
map_compress_N.textContent = "N";
map_compress_E.textContent = "E";
map_compress_S.textContent = "S";
map_compress_W.textContent = "W";
const map_full_container = createDiv("map_full_container");
const map_locat_title = createDiv("map_locat_title");
const map_locat_info = createDiv("map_locat_info");
const map_btn_container = createDiv("map_btn_container");
const map_right_btn = createDiv("map_right_btn", "map_btns");
const map_left_btn = createDiv("map_left_btn", "map_btns");
const map_up_btn = createDiv("map_up_btn", "map_btns");
const map_down_btn = createDiv("map_down_btn", "map_btns");
const map_now_btn = createDiv("map_now_btn", "map_btns");
const map_close_btn = createDiv("map_close_btn", "map_btns");
map_btn_container.append(map_right_btn, map_left_btn, map_up_btn, map_down_btn, map_now_btn, map_close_btn);
map_full_container.append(map_btn_container, map_locat_title, map_locat_info, );
map_compress_div.append(map_compress_N, map_compress_E, map_compress_S, map_compress_W);
full_map_div.append(full_map_padder, map_compress_div, map_full_container);

// 初始添加
user_locate_div.append(user_map_compass, mini_map_div);
mini_map_div.appendChild(mini_map_padder);

// 初始方向資料
const landmark_words = "L";
let NWSE_compass;
let playerPos = {x:0, y:0};
let mini_padding = {N:0, E:0, S:0, W:0, gap:3};
let full_padding = {right:0, left:0, up:0, down:0, gap:2.2};
let visited_map = [];

// EFX效果區
const hand_left = createDiv("hand_left");
const user_hand = createDiv("user_hand");
const flash = createDiv("flash");
const covered_in_blood = createDiv("covered_in_blood");
const state_efx = createDiv("state_efx");

// 按鈕區
const btn_return = createDiv("btn_return", "ui_btns");
const btn_left = createDiv("btn_left", "ui_btns");
const btn_right = createDiv("btn_right", "ui_btns");
const btn_forward = createDiv("btn_forward", "ui_btns");

// 包包物件現在是誰
let SEL_object; 
let bag_show = false;

// 玩家數值 血量，理智
const user_states_div = createDiv("user_states_div");
const user_heart_contain = createDiv("user_heart_contain", "user_state_contain");
const user_sanity_contain = createDiv("user_sanity_contain", "user_state_contain");
const btn_album = createDiv("btn_album");
const btn_bag = createDiv("btn_bag");

// 物品操作面板
const item_operation_panel = createDiv("item_operation_panel");

// 合成區
const facility_div = createDiv("facility_div");
const facility_box = createDiv("facility_box");
const facility_title = createDiv("facility_title", "all_titles");
const facility_trust = createDiv("facility_trust");

facility_title.textContent = "facility";
facility_div.append(facility_title, facility_trust, facility_box);

// 包包區
const bag_div = createDiv(0, "box_div");
const bag_inventory = createDiv(0, "box_inventory");
const bag_title = createDiv("bag_title", "all_titles");
bag_div.append(bag_title, bag_inventory);

// 加入在bag container裡
const bag_close_panel = createDiv("bag_close_panel");

// 獎勵區
const reject_reward_btn = createDiv("reject_reward_btn");
let reward_showed = false;
let rp_reward_ux_arr = 0;
let rp_reward_index;

// 相簿區
const album_div = createDiv(0, "box_div");
const album_inventory = createDiv(0, "box_inventory");
const album_title = createDiv("album_title", "all_titles");
album_div.append(album_title, album_inventory);

// 物品資訊
const object_div = createDiv("object_div");

const object_left_div = createDiv("object_left_div");
const object_top_area = createDiv("object_top_area");
const object_upgrade_btn = createDiv("object_upgrade_btn");

const object_title = createDiv("object_title", "all_titles");
const object_label = createDiv("object_label");

const object_right_div = createDiv("object_right_div");
const object_trade_div = createDiv("object_trade_div");
const object_counter = createDiv("object_counter");
const object_num_add = createDiv("object_num_add");
const object_num_sub = createDiv("object_num_sub");
const object_num_text = createDiv("object_num_text");
object_counter.append(object_num_sub, object_num_text, object_num_add);

const object_buy_btn= createDiv("object_buy_btn", "object_btns");
const object_sell_btn = createDiv("object_sell_btn", "object_btns");
const object_take_btn = createDiv("object_take_btn", "object_btns");

const object_delet_btn = createDiv("object_delet_btn", "object_btns");
const object_use_btn = createDiv("object_use_btn", "object_btns");
const object_give_btn = createDiv("object_give_btn", "object_btns");
const object_album_btn = createDiv("object_album_btn");

// 物品計數器
let obj_num_data;
let obj_num_limit;

// 價錢數據
const price_list = {
    "Flint_stone": 2, 
    "Bone_piece": 2, 
    "Fur_pelt": 2, 
    "Glass_bottle": 3, 
    "Raw_meat": 3,
};
// 合成數據 JSON
const craftable_list = {
    "Meat_soup":{
        1:[{name:"Raw_meat", quantity:3}], 
        2:[{name:"Raw_meat", quantity:1}], 
        3:[{name:"Raw_meat", quantity:2}]
    }, 
    "Extra_pocket":{
        1:[{name:"Raw_meat", quantity:2}, {name:"Fur_pelt", quantity:1}], 
        2:[{name:"Raw_meat", quantity:2}, {name:"Bone_piece", quantity:1}]
    }, 
};

// 商店數據 JSON
const shop_list = {
    "Flint_stone": 3, 
    "Bone_piece": 4, 
    "Fur_pelt": 3, 
    "Glass_bottle": 5, 
    "Raw_meat": 5,
};
// 要放到user
const inventory_list = [
    { name: "Raw_meat", quantity: 5 },
]
let inventory_is_open = false;
let sharebox_is_open = false;

// 敵人數據
const battle_div = createDiv("battle_div");
const battle_light = createDiv("battle_light");
const battle_enemy_img = createDiv("battle_enemy_img");

const enemy_move_div = createDiv("enemy_move_div");
const enemy_now_move = createDiv("enemy_now_move");
const enemy_pre_move = createDiv("enemy_pre_move");
const enemy_next_move = createDiv("enemy_next_move");

const enemy_heart_div = createDiv("enemy_heart_div");
const enemy_heart_bar = createDiv("enemy_heart_bar");
const enemy_heart_remain = createDiv("enemy_heart_remain");
const enemy_heart_label = createDiv("enemy_heart_label");

const enemy_harm_div = createDiv("enemy_harm_div");
const enemy_harm_note = createDiv(0, "harm_note");
const user_harm_div = createDiv("user_harm_div");
const user_harm_note = createDiv(0, "harm_note");

// 敵人攻擊
const attack_div = createDiv("attack_div");

// 現在狀態
let move_of_enemy;
// 絕招計數器
let onslaught_bar = 0;
// 攻擊計時器
let player_turn_timer;

// 初始添加
enemy_move_div.append(enemy_pre_move, enemy_now_move, enemy_next_move);
enemy_heart_bar.appendChild(enemy_heart_remain)
enemy_heart_div.append(enemy_heart_bar, enemy_heart_label)

// 武器系統
const weapon_column = createDiv("weapon_column");
const weapon_holster_1 = createDiv("weapon_holster_1", "weapon_holster");
const weapon_holster_2 = createDiv("weapon_holster_2", "weapon_holster");
const weapon_holster_3 = createDiv("weapon_holster_3", "weapon_holster");
const weapon_information = createDiv("weapon_information");
const weapon_title = createDiv("weapon_title");
const weapon_label = createDiv("weapon_label");

// 一行數量 螢幕限制建議6
const holster_size = 5; 

// 給予文字
function load_system_text() {
    let arr = language_array[user_language];
    lines_pass_btn.textContent = arr.lines_pass_btn;
    reject_reward_btn.textContent = arr.reject_reward_btn;
    end_retry.textContent = arr.end_retry;
    bag_title.textContent = arr.bag_title;
    album_title.textContent = arr.album_title;
    map_locat_title.textContent = arr.map_locat_title;

    object_buy_btn.textContent = arr.object_buy_btn;
    object_sell_btn.textContent = arr.object_sell_btn;
    object_take_btn.textContent = arr.object_take_btn;
    object_use_btn.textContent = arr.object_use_btn;
    object_delet_btn.textContent = arr.object_delet_btn;
    object_give_btn.textContent = arr.object_give_btn;
};
load_system_text();

// MAIN SYSTEM -------------------------------------------------------
render_start_data();
const new_scene = (id, other) => {

    // 初始化
    scene_bg.innerHTML = "";
    scene_ux.innerHTML = "";
    screen_ui.innerHTML = "";
    screen_cover.innerHTML = "";

    is_efx_active = false;

    // 提供主線數據
    if (!other) {
        user.now_scene_data = user.scene_arr[id];
    } else {
    // 提供支線數據
        user.now_scene_data = other[id];
    }

    // 沒接收到東西
    if (!user.now_scene_data) return; 
    // 背景渲染
    if (user.now_scene_data.bg) { scene_bg.className = user.now_scene_data.bg; };
    // 對話渲染 只有房間type不起作用length會變undefined
    if (user.line_arr[id]) { user.line_length = user.line_arr[id].length; }


    if (!user.now_scene_data.is && typeof user.sceneIndex === "number") {
        // 加一 更新位置
        user.sceneIndex += 1;
        // 紀錄 目前位置
        user.last_scene_index = user.sceneIndex;
    } else if (user.now_scene_data.is) {
        // 指定 之前位置
        if (user.now_scene_data.is === "return") user.now_scene_data.is = user.last_scene_index;
        // 指定 特殊位置
        user.sceneIndex = user.now_scene_data.is;
    }

    // 特效渲染
    if (user.now_scene_data.efx) {
        switch (user.now_scene_data.efx) {
            case "dark":
                render_efx_dark();
            break;
        }
    }
    switch (user.now_scene_data.type) {
        // 純動畫
        case "anim":
            render_change();
            scene_bg.addEventListener("animationend", (event) => {
                if (event.animationName === user.now_scene_data.bg
                    && user.now_scene_data.type === "anim") {
                    scene_bg.className = "";
                    render_efx_fade_out(user.sceneIndex);
                }
            });
            break;
        // 純對話
        case "line": 
            if (user.now_scene_data.lyric) {
                user.line_length = Object.keys(user[`${user.now_scene_data.lyric}_line`][id]).length;
                user.line_rp = user[`${user.now_scene_data.lyric}_line`][id];
                new_line(user.line_length);  // 台詞機
            } else {
                user.line_length = Object.keys(user.line_arr[id]).length;
                user.line_rp = user.line_arr[id];
                new_line();
            }
            break;
        // 特寫 只有返回按鈕
        case "close": 
            user.line_length = 0;
            new_line();
            break;
        // 牆 點point
        case "view":
            user.line_length = 0;
            new_line();
            break;
        // 房間
        case "room":
            // 渲染背景

            switch(NWSE_compass) {
                case"N":
                    scene_bg.className = user.now_scene_data.bg[NWSE_compass];
                break;
                case"E":
                    scene_bg.className = user.now_scene_data.bg[NWSE_compass];
                break;
                case"S":
                    scene_bg.className = user.now_scene_data.bg[NWSE_compass];
                break;
                case"W":
                    scene_bg.className = user.now_scene_data.bg[NWSE_compass];
                break;
            }
            new_line();
            break;
        // 下一章節
        case "end":
            screen.appendChild(end_div);
            render_end(user.now_scene_data.dead);
            break;
        default:
            break;
    }
};
const new_line = () => {
    //初始化
    screen_ui.innerHTML = ""; 

    if (user.line_rp && user.line_length > 0) {
        lines_div.innerHTML = "";
        lines_text.textContent = user.line_rp[user.line_id];

        // 加入npc的名子
        if (now_trader !== "") {
            lines_name.textContent = now_trader;
            lines_div.appendChild(lines_name);
        }

        lines_div.append(lines_text, lines_btn, lines_pass_btn);
        screen_ui.appendChild(lines_div); // 容器位置
        user.line_id += 1;
        user.line_length -= 1;
        // SD_2.currentTime = "";
        // SD_2.play();
    } else {

        // 初始
        user.line_id = 0;
        ux_button_open(true);

        // 按鈕生成
        if (user.now_scene_data?.btn && user.now_scene_data.btn[NWSE_compass]) {
            screen_ui.appendChild(btn_forward);
        }
        screen_ui.append(btn_left, btn_right, item_operation_panel);

        // 渲染玩家狀態
        render_user_state();
        screen_ui.appendChild(user_locate_div);
        
        switch (user.now_scene_data.type) {
            // 去下一頁
            case "line": 
                // 獲得物品
                if (user.now_scene_data.reward) {
                    render_reward(user.now_scene_data.reward);
                // 進下個畫面
                } else {
                    render_efx_fade_out(user.sceneIndex);
                };
                break;
            // 上頁按鈕
            case "close": 
                render_ux();
                render_btn_return();
                break;
            // 加入ux
            case "view": 
                if (user.now_scene_data.ux) {
                    if (user.now_scene_data.ux.some(item => item.type === "enemy")) {
                        screen_ui.removeChild(btn_forward);
                    } 
                    render_ux();
                }
                break;
            // 加入ux
            case "room": 
                if (user.now_scene_data.ux) {
                        // console.log(NWSE_compass, user.now_scene_data.btn)
                        if (user.now_scene_data.ux) {
                        switch(NWSE_compass) {
                            
                            case"N":
                                if (user.now_scene_data.btn.N) render_ux();
                            break;
                            case"E":
                                if (user.now_scene_data.btn.E) render_ux();
                            break;
                            case"S":
                                if (user.now_scene_data.btn.S) render_ux();
                            break;
                            case"W":
                                if (user.now_scene_data.btn.W) render_ux();
                            break;
                        }
                    } 
                }
                
                // 無敵人情況
                if (user.now_scene_data[NWSE_compass]) {
                    render_ux(NWSE_compass);
                }
                break;
        }
        // 對話完成獎勵
        if (rp_reward_ux_arr) {
            render_reward(rp_reward_ux_arr, rp_reward_index);
            rp_reward_ux_arr = 0;
            render_change("add");
        };
    }
};
// UIUX -------------------------------------------------------
const render_ux = (direct) => {

    // 初始
    scene_ux.innerHTML = "";
    
    // 取得數據
    // const uxs_arr = direct ? user.now_scene_data[direct] : user.now_scene_data.ux;
    let uxs_arr;
    if (direct) {
        uxs_arr = user.now_scene_data[direct];
    } else {
        uxs_arr = user.now_scene_data.ux;
    }
    
    if (!uxs_arr) return;

    uxs_arr.forEach((ux_arr, index) => {

        const trigger = document.createElement("div");

        trigger.className = "ux_btns"; // 添加 class
        scene_ux.appendChild(trigger); // 容器位置

        trigger.style.left = (ux_arr.x !== undefined) ? ux_arr.x + "vh" : "0";
        trigger.style.top = (ux_arr.y !== undefined) ? ux_arr.y + "vh" : "0";
        trigger.style.width = (ux_arr.w !== undefined) ? ux_arr.w + "vh" : "100%";
        trigger.style.height = (ux_arr.h !== undefined) ? ux_arr.h + "vh" : "100%";
        if (ux_arr.type === "merch") {
            trigger.style.zIndex = "10";
        };
        // 有名子的對象
        if (ux_arr.type === "enemy" || ux_arr.type === "npc") now_trader = ux_arr.name;
        // if (ux_arr.type === "enemy") {
        //     trigger.className = "ux_btns enemy_start";
        // }
        // 有圖的ux
        if (ux_arr.bg && ux_arr.type !== "merch") { trigger.classList.add(ux_arr.bg) }
        // 點擊
        trigger.addEventListener("click", (event) => {
            click_ux(event, ux_arr, index);
        });
    });
};
let rp_selected_ux = "";
let enemy_data = 0;
const click_ux = (event, ux_arr, index) => {
    // SD_9.currentTime = 0;
    // SD_9.play();
    user.now_click_data = ux_arr;
    scene_ux.children[0].style.pointerEvents = "auto";
    
    // 按鈕禁用
    ux_button_open(false);

    switch (ux_arr.type) {
        // 交易所
        case "unique":

            // 加入交易對象
            if (ux_arr.who) now_trader = ux_arr.who;

            // 場所渲染
            const unique_ux_list = {
                "craft": render_crafting_system,
                "shop": render_shop_system,
                "inventory": render_inventory_init,
                "sharebox": render_sharebox_init,
            }

            // unique_ux_list 中存在對應的事件
            if (unique_ux_list.hasOwnProperty(ux_arr.is)) {
                unique_ux_list[ux_arr.is](); 
            } else {
                console.log("No matching function for:", ux_arr.is);
            }
            
        break;
        // 轉場
        case "next":
            if (ux_arr.wall) { user.wall = ux_arr.wall; };
            user.sceneIndex = ux_arr.is;
            // new_scene!!!(ux_arr.is);
            render_efx_fade_out(ux_arr.is);
            break;
        // 物件
        case "item":       
            // 確認點選目標
            if (rp_selected_ux) return;
            rp_selected_ux = event;
            
            // 切割水晶
            if (ux_arr.bg === "Impurity_crystal") {
                if (user.bag.E6D_bullet !== undefined) {
                    hand_left.className = "fire_E6D_bullet";
                    setTimeout(() => {
                        render_reward(ux_arr.reward, index);
                    }, 500);
                } else {
                    render_popUp("E6D bullet not enought");
                }
            } else {
                render_reward(ux_arr.reward, index);
            }
            break;
        // 對話
        case "npc":

            user.line_length = Object.keys(user[`${ux_arr.lyric}_line`][ux_arr.is]).length;
            user.line_rp = user[`${ux_arr.lyric}_line`][ux_arr.is];
            new_line(user.line_length,);  // 台詞機

            if (ux_arr.reward) {
                rp_reward_ux_arr = ux_arr.reward;
                rp_reward_index = index;
                delete ux_arr.reward; // 刪掉獎勵
                // render_reward(ux_arr.reward, index);
            }
            break;
        case "enemy":
        case "boss":
            // 繼承獎勵
            enemy_data = ux_arr; 
            // 開使戰鬥
            render_battle_init();
            render_player_init();
            // 敵人動畫
            scene_ux.children[0].classList.remove("enemy_start");
            scene_ux.children[0].classList.add("enemy_anim");
            scene_ux.children[0].style.pointerEvents = "none";
            rp_selected_ux = event;
            break;
        case "choice":
            game_of_sanity(ux_arr.is);
            break;
    }
};
// SYSTEMS -------------------------------------------------------

// 遊戲初始化
function render_start_data() { 
    
    stop_game_timers();

    user.heart = user.heart_limit;

    // 地圖
    NWSE_compass = "N";
    mini_padding = {N:0, E:0, S:0, W:0, gap:3};
    mini_map_padder.style.padding = "0vh"
    mini_map_div.style.transform = `rotate(0deg)`; 
    
    // 需要等待一下不然跑不出來
    setTimeout(() => {
        playerPos.x = user.start_locat.x;
        playerPos.y = user.start_locat.y;
        visited_map.push({x:user.start_locat.x, y:user.start_locat.y})
        initMap();  
    }, 1000);
};
// 停止計時器
function stop_game_timers() {
    clearTimeout(player_turn_timer);
};
// 轉場特效
let is_efx_active = false;
const render_efx_fade_out = (way) => {
    if (is_efx_active) return;

    // 正在運行
    is_efx_active = true; 
    screen_bg.className = "fade_out_anim";
    screen_ui.className = "fade_out_anim";

    // fade_out_anim 動畫的結束
    screen_bg.addEventListener("transitionend", function onFadeOutEnd(e) {
        if (e.propertyName === "opacity" && screen_bg.classList.contains("fade_out_anim")) {
            screen_bg.className = "fade_in_anim";
            screen_ui.className = "fade_in_anim";
            new_scene(way); // 進行場景切換

            // 監聽 fade_in_anim 動畫的結束
            screen_bg.addEventListener("transitionend", function onFadeInEnd(e) {
                if (e.propertyName === "opacity" && screen_bg.classList.contains("fade_in_anim")) {
                    // 移除所有動畫樣式
                    screen_bg.className = "";
                    screen_ui.className = "";
                    is_efx_active = false;

                    // 清除監聽器，防止多次觸發
                    screen_bg.removeEventListener("transitionend", onFadeInEnd);
                }
            });
            // 清除監聽器，防止多次觸發
            screen_bg.removeEventListener("transitionend", onFadeOutEnd);
        }
    });
};

// 染血特效
const render_blood_animation = (type) => {
    // 加入動畫元素
    screen_cover.appendChild(covered_in_blood);

    if (type === "blood") {
        covered_in_blood.className = Math.random() < 0.5 ? "blood_1" : "blood_2";
    } else if ( type === "dead") {
        covered_in_blood.className = "dead_efx";
    }

    covered_in_blood.addEventListener("animationend",
        function cleanupAnimation() {

            // 移除動畫
            if (screen_cover.contains(covered_in_blood)) {
                covered_in_blood.className = "";
                screen_cover.removeChild(covered_in_blood);
            }
            
            // 場景切換
            if ( type === "dead") {
                new_scene("dead");
            };
        },
        // 只執行一次
        { once: true }
    );
};
// 手電筒特效
const render_efx_dark = () => {
    screen_cover.innerHTML = "";
    screen_cover.append(flash);
};
let chasing = false; // 追逐器狀態
let chase_path = []; // 追逐器追蹤的方塊
// 初始化地圖
function initMap() {

    mini_map_padder.appendChild(map_tile_container);
    map_tile_container.innerHTML = "";
    // 給予對應寬度
    map_tile_container.style.gridTemplateColumns = `repeat(${user.map[0].length}, 1vh)`;

    for (let y = 0; y < user.map.length; y++) {
        for (let x = 0; x < user.map[y].length; x++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.id = `cell_${y}_${x}`
            if (user.map[y][x] !== 'x_0000') {
                tile.classList.add("path");
            }
            if (user.map[y][x].includes(landmark_words)) {
                tile.classList.add("landmark");
            }
            if (x === playerPos.x && y === playerPos.y) {
                tile.classList.add("map_player");
                if (tile.classList.contains("landmark")) {
                    chasing = false;
                    user.sanity = user.sanity_limit;
                }
            }
            // 標記 sanity 位置
            if (chasing && x === chase_path[0].x && y === chase_path[0].y) {
                tile.classList.add("map_sanity");
                
                // 檢查是否 Game Over
                if (x === playerPos.x && y === playerPos.y) {
                    
                    
                    tile.classList.remove("map_sanity");
                    console.log("1")
                    // return;
                }
            }
            
            // 未拜訪過的地圖 給予樣式
            const alreadyVisited =  visited_map.some(
                loc => loc.x === x && loc.y === y
            );
            if (!alreadyVisited && user.map[y][x] !== 'x_0000') {
                tile.classList.add("unvisited"); 
            }
            map_tile_container.appendChild(tile);

            tile.addEventListener("click", () => {
                if (user.map[y][x].includes(landmark_words)) {
                    // 提取括號內內容
                    map_locat_info.textContent =  items_data[user_language].info[user.map[y][x].split(landmark_words)[1]];
                } else {
                    map_locat_info.textContent = items_data[user_language].info["path"];
                    
                }
            });
        }
    }
};
// 取得方向偏移量
function getOffset(input) {
    switch (input) {
        case 'N': return { x: 0, y: -1 };
        case 'E': return { x: 1, y: 0 };
        case 'S': return { x: 0, y: 1 };
        case 'W': return { x: -1, y: 0 };
    }
};
// 角色移動
function movePlayer() {

    const offset = getOffset(NWSE_compass);
    const newX = playerPos.x + offset.x;
    const newY = playerPos.y + offset.y;
    if (chasing) move_chase_path();
    // 檢查是否在地圖範圍內，且目的地是通道
    if (
        newY >= 0 && newY < user.map.length &&
        newX >= 0 && newX < user.map[newY].length &&
        user.map[newY][newX] !== 'x_0000'
    ) {
        playerPos.x = newX;
        playerPos.y = newY;

        // 減少理智
        const isVisited = visited_map.some(point => point.x === newX && point.y === newY);
        if (!isVisited && user.sanity > 0) {
             // 加入傷害提示
            
            // sanity_harm_div.appendChild(sanity_harm_note);
            // sanity_harm_note.textContent = `-${user.sanity["harm"]}`;
            user.sanity -= 1; // 減少理智值
            // 開始追逐戰
            if (user.sanity<=0) {
                start_chasing();
                document.querySelector("#user_sanity_icon").className = "sanity_danger";
            }
        }

        // 記錄新地點
        visited_map.push({ x: newX, y: newY });
        
        // (可選) 若需要時才去重，避免頻繁運算
        const uniqueMap = [];
        function removeDuplicates(map) {
            const seen = new Set();
            for (const point of map) {
                const key = `${point.x},${point.y}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueMap.push(point);
                    
                }
            }
            visited_map = uniqueMap;
        }
        removeDuplicates(visited_map);
        
        // 根據方向調整對應的 padding 值
        // console.log("padding", mini_padding)
        let remain_num = mini_padding.gap;
        switch (NWSE_compass) {
            case "N":
                if (mini_padding.S >= mini_padding.gap) {
                    mini_padding.S -= mini_padding.gap;
                } else if (mini_padding.S > 0) {
                    remain_num = mini_padding.gap-mini_padding.S;
                    mini_padding.S = 0;
                    mini_padding.N += remain_num;
                } else {
                    
                mini_padding.N += mini_padding.gap;
            }
                break;
            case "W":
                if (mini_padding.W >= mini_padding.gap) {
                    mini_padding.W -= mini_padding.gap;
                } else if (mini_padding.W > 0) {
                    remain_num = mini_padding.gap-mini_padding.W;
                    mini_padding.W = 0;
                    mini_padding.E += remain_num;
                } else {
                    
                mini_padding.E += mini_padding.gap;
            }
                break;
            case "S":
                if (mini_padding.N >= mini_padding.gap) {
                    mini_padding.N -= mini_padding.gap;
                } else if (mini_padding.N > 0) {
                    remain_num = mini_padding.gap-mini_padding.N;
                    mini_padding.N = 0;
                    mini_padding.S += remain_num;
                } else {
                    
                mini_padding.S += mini_padding.gap;
            }
                break;
            case "E":
                if (mini_padding.E >= mini_padding.gap) {
                    mini_padding.E -= mini_padding.gap;
                } else if (mini_padding.E > 0) {
                    remain_num = mini_padding.gap-mini_padding.E;
                    mini_padding.E = 0;
                    mini_padding.N += remain_num;
                } else {
                    
                mini_padding.W += mini_padding.gap;
            }
                break;
        }
        mini_map_padder.style.paddingTop = `${mini_padding.N}vh`;
        mini_map_padder.style.paddingLeft = `${mini_padding.E}vh`;
        mini_map_padder.style.paddingBottom = `${mini_padding.S}vh`;
        mini_map_padder.style.paddingRight = `${mini_padding.W}vh`;

        // 檢查是否抵達終點
        if (user.map[newY][newX].includes('final station')) {
        alert("Win!");
        }
    }
    initMap();
};
// 移動大地圖
function full_map_move(direct) {
    switch (direct) {
        case "right":
            full_padding["right"] += 10;
            break;
        case "left":
            full_padding["left"] += 10;
            break;
        case "up":
            full_padding["up"] += 10;
            break;
        case "down":
            full_padding["down"] += 10;
            break;
        case "now":
            full_padding["right"] = 0;
            full_padding["left"] = 0;
            full_padding["up"] = 0;
            full_padding["down"] = 0;
            break;
    }
    // 更新地圖的 padding
    full_map_padder.style.paddingTop = `${full_padding["up"] + ( mini_padding.N * full_padding.gap)}vh`;
    full_map_padder.style.paddingLeft = `${full_padding["left"] + ( mini_padding.E * full_padding.gap)}vh`;
    full_map_padder.style.paddingBottom = `${full_padding["down"] + ( mini_padding.S * full_padding.gap)}vh`;
    full_map_padder.style.paddingRight = `${full_padding["right"] + ( mini_padding.W * full_padding.gap)}vh`;
}
// 監聽移動
map_right_btn.addEventListener("click", () => { full_map_move("left"); });
map_left_btn.addEventListener("click", () => { full_map_move("right"); });
map_up_btn.addEventListener("click", () => { full_map_move("up"); });
map_down_btn.addEventListener("click", () => { full_map_move("down"); });
map_now_btn.addEventListener("click", () => { full_map_move("now"); });
// 開啟大地圖
mini_map_div.addEventListener("click", () => {
    // initMap();
    screen_ui.appendChild(full_map_div);
    full_map_padder.appendChild(map_tile_container);
    map_tile_container.style.gridTemplateColumns = `repeat(${user.map[0].length}, 3vh)`;
    full_map_move("now");
    ux_button_open(false);
});
// 關閉大地圖
map_close_btn.addEventListener("click", () => {
    if (screen_ui.contains(full_map_div)) screen_ui.removeChild(full_map_div);
    initMap();
    ux_button_open(true);
});
// 旋轉地圖
function rotate(input) {
    const rotationMap = {
        "N": { "left": "W", "right": "E", "turn_left": 90, "turn_right": -90 },
        "E": { "left": "N", "right": "S", "turn_left": 0, "turn_right": 180 },
        "S": { "left": "E", "right": "W", "turn_left": -90, "turn_right": 90 },
        "W": { "left": "S", "right": "N", "turn_left": 180, "turn_right": 0 }
    };
    // 更新方向並設置旋轉角度
    if (input === "left") {
        if (NWSE_compass === "N") {
            mini_map_div.className = "rotate_L_N";
        } else if (NWSE_compass === "E") {
            mini_map_div.className = "rotate_L_E";
        } else if (NWSE_compass === "S") {
            mini_map_div.className = "rotate_L_S";
        } else if (NWSE_compass === "W") {
            mini_map_div.className = "rotate_L_W";
        }
        // 旋轉地圖
        mini_map_div.style.transform = `rotate(${rotationMap[NWSE_compass].turn_left}deg)`; 
        NWSE_compass = rotationMap[NWSE_compass].left;
    } else {
        if (NWSE_compass === "N") {
            mini_map_div.className = "rotate_R_N";
        } else if (NWSE_compass === "E") {
            mini_map_div.className = "rotate_R_E";
        } else if (NWSE_compass === "S") {
            mini_map_div.className = "rotate_R_S";
        } else if (NWSE_compass === "W") {
            mini_map_div.className = "rotate_R_W";
        }
        // 旋轉地圖
        mini_map_div.style.transform = `rotate(${rotationMap[NWSE_compass].turn_right}deg)`;
        NWSE_compass = rotationMap[NWSE_compass].right; 
    }
    
    mini_map_div.addEventListener("animationend", () => {
        mini_map_div.className = "";
    });
    user_map_compass.addEventListener("animationend", () => {user_map_compass.className = "";});
    initMap();
};
// 通用切換方向
const handleRotate = (direction) => {
    if (chasing) {
        move_chase_path();
        if (chase_path[0].x === playerPos.x && chase_path[0].y === playerPos.y) {
            // tile.classList.remove("map_sanity");
            // 死亡歸零
            chasing = false;
            user.sanity = user.sanity_limit;
            stop_game_timers();
            render_blood_animation("dead");
            return;
        }
    };
    render_efx_fade_out(user.sceneIndex);
    rotate(direction);
};
// 方向按鈕
btn_return.addEventListener("click", () => {
    render_efx_fade_out(user.now_scene_data.btn["B"]);
});
// 左右旋轉按鈕
btn_left.addEventListener("click", () => handleRotate("left"));
btn_right.addEventListener("click", () => handleRotate("right"));
// 前進按鈕
btn_forward.addEventListener("click", () => {
    const nextSceneIndex = user.now_scene_data.btn[NWSE_compass];
    if (nextSceneIndex) {
        if (is_efx_active) return;
        user.sceneIndex = nextSceneIndex;
        render_efx_fade_out(user.sceneIndex);
        movePlayer();
    }
});
// 鍵盤事件
document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
        case "a":
            handleRotate("left");
            break;
        case "d":
            handleRotate("right");
            break;
        case "w":
            const nextSceneIndex = user.now_scene_data.btn[NWSE_compass];
            if (nextSceneIndex) {
                user.sceneIndex = nextSceneIndex;
                render_efx_fade_out(user.sceneIndex);
                movePlayer();
            }
            break;
    }
});

// 理智追逐器
function start_chasing() {
    if (chasing) return; // 如果已經開始追逐，跳過
    chasing = true;

    // update chase_path
    for (let distance = 3; distance > 0; distance--) {
        const nearby_path = find_nearby_path(playerPos.x, playerPos.y, distance);
        if (nearby_path.length > 0) {
            chase_path = nearby_path;
            // console.log("Chase path updated", chase_path);
            break;
        }
    }
};
// 相鄰的路徑
function find_nearby_path(playerX, playerY, maxDistance) {
    const paths = [];
    for (let y = 0; y < user.map.length; y++) {
        for (let x = 0; x < user.map[y].length; x++) {
            if (user.map[y][x] !== "x_0000", !user.map[y][x].includes("L")) continue; // 只處理通道
            const distance = Math.abs(playerX - x) + Math.abs(playerY - y);
            if (distance === maxDistance) {
                paths.push({ x, y });
            }
        }
    }
    // console.log("paths", paths )
    return paths;
}
function move_chase_path() {

    // 更新追逐者位置
    chase_path = chase_path.map(({ x, y }) => {
        const dx = playerPos.x - x;
        const dy = playerPos.y - y;

        let newX = x;
        let newY = y;
        
        // 優先選擇距離更遠的軸移動
        if (Math.abs(dx) > Math.abs(dy)) {
            newX = x + Math.sign(dx); // 只在 x 軸移動
        } else {
            newY = y + Math.sign(dy); // 只在 y 軸移動
        }
        return { x: newX, y: newY }; // 返回更新後的座標
    });
}

// 玩家數據、位置
function render_user_state(action, num) {
    
    item_operation_panel.innerHTML = "";
    item_operation_panel.appendChild(user_states_div);
    user_states_div.innerHTML = "";

    // 傷害或治療
    if (action) {
        switch (action) {
            // 傷害
            case "harm":
                
                // 加入提示 
                render_blood_animation("blood");

                // 傷害確認 
                const user_harm_timer = setTimeout(() => {

                    user.heart -= num;
                    user_harm_div.appendChild(user_harm_note);
                    user_harm_note.textContent = `-${num}`;
                    clearTimeout(user_harm_timer);

                }, 1000);

                // 提示結束 目前只有戰鬥
                player_turn_timer = setTimeout(() => {
                    render_player_init();
                    clearTimeout(user_harm_timer);
                }, 2000);
    
                // 死亡歸零
                if (user.heart < 0) {
                    user.heart = 0;
                    stop_game_timers();
                    render_blood_animation("dead");
                }
            break;
            // 治療
            case "heal":
                
                user.heart += num;

                // 抵達上限
                if (user.heart > user.heart_limit) user.heart = user.heart_limit;
                user_harm_div.appendChild(user_harm_note);
                user_harm_note.textContent = `+${num}`;

            break;
        }
    }

    // 顯示文字
    const render_state_data = (name) => {
        const user_each_state = createDiv(0, "user_each_state");
        const user_state_icon = createDiv(0, "user_state_icon");
        const user_state_data = createDiv(0, "user_state_data");
        const user_state_limit = createDiv(0, "user_state_limit");

        user_state_icon.id = `user_${name}_icon`;
        user_state_data.textContent = `${user[name]}`;
        user_state_limit.textContent = ` / ${user[`${name}_limit`]}`

         // 動態修改 className 根據狀態
        if (name === "sanity") {
            const sanityClass = user.sanity / user.sanity_limit < 0.3 ? "user_state_icon sanity_danger" : "user_state_icon sanity_safe";
            user_state_icon.className = sanityClass;
        }
        
        const containerMap = {
            "heart": user_heart_contain,
            "sanity": user_sanity_contain
        };
        containerMap[name].innerHTML = "";
        containerMap[name].append(user_state_data, user_state_limit);

        user_each_state.append(user_state_icon, containerMap[name]);
        user_states_div.appendChild(user_each_state);
    };

    // 渲染使用者狀態
    ["heart", "sanity"].forEach(render_state_data);
    if (action !== "init") {
        user_states_div.append(btn_album, btn_bag);
    }

    // 渲染位置 ${user.sceneIndex}
    user_map_compass.textContent = String(`${NWSE_compass}`);

};

// 提示結束
user_harm_note.addEventListener("animationend", () => {
    user_harm_div.innerHTML = "";
});
// 玩家數值更新
user_sanity_contain.addEventListener("animationend", () => {
    if (user_sanity_contain.className === "heart_jump") {
        user_sanity_contain.className = "";
        render_sanity();
        console.log("use??")
    }
});
user_heart_contain.addEventListener("animationend", () => {
    if (user_heart_contain.className === "heart_jump") {
        user_heart_contain.className = "";
        if (user.heart <= 0) { 
            user.sanity -= 1;
            // clearInterval(enemy_attack_timer!!!);
            // screen_cover.appendChild(state_efx);
            // state_efx.className = "dead_efx";
            // attack_div.innerHTML = "";
        }
    }
});
// 結束畫面
const render_end = (num) => {
    render_start_data();
    end_div.innerHTML = "";
    end_div.append(end_img, end_label, end_retry);
    switch (num) {
        case "dead in fight":
            end_label.textContent = "the best wish, is dead alone"; // 當 num 等於 1 時，執行這裡的代碼
            break;
        case 2:
            end_label.textContent = "end 2";
            break;
    }
};
// 重新開局
end_retry.addEventListener("click", () => {
    if (screen.contains(end_div)) screen.removeChild(end_div);
    user.now_end = `${user.start_locat.x},${user.start_locat.y}`;
    user.sceneIndex = user.now_end;
});

// 改變遊戲
const render_change = (num, order) => {
    switch (order) {
        case "add":

            break;
        case "minus":
            user.scene_arr[user.sceneIndex].ux[num] = [];
            break;
        default:
            break;
    }
};
// 跳出文字
const render_popUp = (text) => {
    screen.appendChild(pop_note);
    pop_note.textContent = `${text.replace(/_/g, " ")}`;
};
pop_note.addEventListener("animationend", (event) => {
    if (event.animationName === "pop_anim") {
        screen.removeChild(pop_note);
    }
});
// ux 按鈕開關
const ux_button_open = (value) => {

    const sceneUxChildren = document.querySelector('#scene_ux').children;

    if (value === true) {
        Array.from(sceneUxChildren).forEach(child => {
            child.style.pointerEvents = "auto";
        });
    } else if (value === false) {
        Array.from(sceneUxChildren).forEach(child => {
            child.style.pointerEvents = "none";
        });
    }
};

// Battle SYSTEM 遊戲中的第一迴圈 ------------------------------------------------------- 
let enemy_move_calculator;
const round_order = {
    1:"move_attack",
    2:"move_defense",
    3:"move_concentrate",
    4:"move_onslaught"
}
let enemy_turn_timer;
let enemy_pre_data;
// 初始敵人數值
function render_battle_init() {

    // 清空
    screen_ui.innerHTML = "";
    screen_ui.append(battle_div, item_operation_panel);

    // 玩家手
    screen_cover.innerHTML = "";
    screen_cover.appendChild(user_hand);
    user_hand.className = "idle_move";

    // 敵人圖片
    battle_div.innerHTML = "";
    battle_div.append(
        battle_light, battle_enemy_img, enemy_move_div, 
        enemy_heart_div, enemy_harm_div, user_harm_div);
        battle_enemy_img.className = enemy_data["bg"];

    // 敵人血量
    user.enemy["heart"] = enemy_data["heart"];
    enemy_heart_label.textContent = user.enemy["heart"];

    // 渲染圖案
    enemy_move_calculator = 0;
    move_of_enemy = round_order[enemy_data.order[0]];
    enemy_pre_data = "";
};
// 可用的戰鬥手段
const attack_idle = createDiv("attack_idle", "WEP_btn");
const defense_idle = createDiv("defense_idle", "WEP_btn");

// 選擇攻擊手段。手動畫，物品名
attack_idle.addEventListener("click", (() => render_player_move("attack", "idle")));
defense_idle.addEventListener("click", () => render_player_move("defense", "idle"));

// 初始玩家
function render_player_init() {
    
    // 武器顯示
    render_popUp("your turn")
    weapon_column.className = "";

    // 初始
    // screen_ui.innerHTML = "";
    weapon_holster_1.innerHTML = "";
    weapon_holster_2.innerHTML = "";
    weapon_holster_3.innerHTML = "";
    weapon_information.innerHTML = "";
    
    // 基礎攻擊
    weapon_holster_1.append(attack_idle, defense_idle);
    attack_idle.className = "WEP_btn";
    defense_idle.className = "WEP_btn";

    // 子元素最大數量
    let now_holster = weapon_holster_1;
    let holster_items = 0;

    // 用於記錄已處理的物品名稱
    const processedItems = new Set(); 

    // 加入武器 user.bag
    for (const index in user.bag) {

        // 跳過已處理的物品
        if (processedItems.has(user.bag[index].name)) continue;

        // 將物品名稱加入已處理集合
        processedItems.add(user.bag[index].name);
        
        if (items_data.effects[user.bag[index].name]) {

            // 生成元素
            const weaponBtn = createDiv(0, `${user.bag[index].name} WEP_btn`);
            
            // 計算同名物品的總數量
            const totalQuantity = user.bag
                // 先過濾出同名的物件
                .filter(bagItem => bagItem.name === user.bag[index].name)
                // 加總出總和
                .reduce((sum, bagItem) => sum + bagItem.quantity, 0);

            // 建立數量
            const weapon_num = createDiv(0, "WEP_num");
            weapon_num.textContent = totalQuantity;

            // 初始化按鈕
            weaponBtn.innerHTML = "";
            weaponBtn.appendChild(weapon_num);

            // 點擊事件
            weaponBtn.addEventListener("click", () => 
                // 動作，物品
                render_player_move(items_data.effects[user.bag[index].name].is, user.bag[index].name)
            );

            // 超過number 切換到下一個 holster
            if (holster_items >= holster_size) {
                if (now_holster === weapon_holster_1) {
                    now_holster = weapon_holster_2;
                } else if (now_holster === weapon_holster_2) {
                    now_holster = weapon_holster_3;
                }
                // 重設計數
                holster_items = 0; 
            }

            // 加入物品到當前的 holster 並遞增計數
            now_holster.appendChild(weaponBtn);
            holster_items++;
        }
    }

    // holster 加到 weapon_column
    weapon_column.innerHTML = "";
    weapon_column.appendChild(weapon_holster_1);

    // 兩行
    if (weapon_holster_2.children.length > 0) {
        weapon_column.appendChild(weapon_holster_2);
    }
    // 三行
    if (weapon_holster_3.children.length > 0) {
        weapon_column.appendChild(weapon_holster_3);
    }

    // 加入剩餘項目
    weapon_column.appendChild(weapon_information);
    weapon_information.append(weapon_title, weapon_label);
    screen_ui.appendChild(weapon_column);

    // 重整狀態
    render_user_state("init");
};
// 說明
function render_battle_info(name) {
    weapon_title.textContent = items_data[user_language].title[name];
    weapon_label.textContent = items_data[user_language].info[name];  
};
let player_move;
const enemy_move_time = 800;
// 玩家行動
function render_player_move(action, item) {

    clearTimeout(enemy_turn_timer);
    // 鎖住武器庫
    weapon_column.className = "weapon_column_lock";
    // 說明文字
    render_battle_info(item);

    // 開始行動 
    user_hand.className = `${action}_${item}`;

    // 判斷行動
    clearTimeout(enemy_turn_timer);
    enemy_turn_timer = setTimeout(() => {

        // 結束動畫
        user_hand.className = "idle_move";
        enemy_harm_div.innerHTML = "";
        player_move = action;

        switch (action) {
            // 攻擊
            case "attack":
                // 攻擊失敗
                if (move_of_enemy === "move_defense") {

                    // 換對方
                    render_popUp("enemy dodge!");
                    clearTimeout(enemy_turn_timer);
                    enemy_turn_timer = setTimeout(() => {
                        render_enemy_move(); 
                    }, enemy_move_time);
                    return;

                } else {
                // 攻擊成功

                    // 包包物品攻擊
                    if (items_data.effects[item] && items_data.effects[item].attack) {

                        // 找出所有同名物品
                        const targetItems = user.bag
                            .filter(bagItem => bagItem.name === item) 
                            // 按數量升序排序，若數量相同則按背包順序排序（後面的優先）
                            .sort((a, b) => a.quantity - b.quantity || user.bag.indexOf(b) - user.bag.indexOf(a)); 
                        
                        if (targetItems.length > 0) {

                            // 從第一個物品減去數量
                            targetItems[0].quantity -= 1;

                            // 如果該物品數量小於 1，從背包移除
                            if (targetItems[0].quantity < 1) {
                                const indexToRemove = user.bag.indexOf(targetItems[0]);
                                if (indexToRemove !== -1) {
                                    user.bag.splice(indexToRemove, 1);
                                }
                            }
                        }
                        // 傷害統計
                        user.enemy["harm"] = items_data.effects[item].attack;

                    } else {
                        // 基本攻擊
                        user.enemy["harm"] = 2;
                    }
                    
                    // 加入傷害提示
                    enemy_harm_div.appendChild(enemy_harm_note);
                    enemy_harm_note.textContent = `-${user.enemy["harm"]}`;
                }
            break;
            // 治療
            case "heal":

                // 血量上限
                if (user.heart >= user.heart_limit) {
                    render_popUp("reach heart limit")
                } else {
                // 繼續補血
                    // 包包物品有heal
                    if (items_data.effects[item] && items_data.effects[item].heal) {

                        // 找出所有同名物品
                        const targetItems = user.bag
                            .filter(bagItem => bagItem.name === item) 
                            // 按數量升序排序，若數量相同則按背包順序排序（後面的優先）
                            .sort((a, b) => a.quantity - b.quantity || user.bag.indexOf(b) - user.bag.indexOf(a)); 
                        
                        if (targetItems.length > 0) {
                            // 從第一個物品減去數量
                            targetItems[0].quantity -= 1;

                            // 如果該物品數量小於 1，從背包移除
                            if (targetItems[0].quantity < 1) {
                                const indexToRemove = user.bag.indexOf(targetItems[0]);
                                if (indexToRemove !== -1) {
                                    user.bag.splice(indexToRemove, 1);
                                }
                            }
                        }
                        // 落實補血
                        render_user_state("heal", items_data.effects[item].heal);
                    }
                }
            break;
            // 防禦
            case "defense":
            break;
        }
        // 換對方
        enemy_turn_timer = setTimeout(() => {
            render_enemy_move(); 
        }, enemy_move_time);

    }, 400);
};
// 攻擊結束
enemy_harm_note.addEventListener("animationend", () => {

    // 敵人扣血
    enemy_harm_div.innerHTML = "";
    user.enemy["heart"] -= user.enemy["harm"];
    enemy_heart_label.textContent = `${user.enemy["heart"]}`;

    // 結束回合
    if (user.enemy.heart > 0) {
            clearTimeout(enemy_turn_timer);
            enemy_turn_timer = setTimeout(() => {
                render_enemy_move(); 
            }, enemy_move_time);
        return;
    
    // 贏了敵人
    } else { 
        clearTimeout(enemy_turn_timer);

        user.enemy.heart = 0;
        enemy_heart_label.textContent = user.enemy.heart;
        render_popUp("win");

        // 移除事件
        clearTimeout(player_turn_timer);
        render_change(0, "minus");
        battle_enemy_img.classList.add("enemy_faded_out");
        weapon_column.className = "weapon_column_lock";
        battle_enemy_img.addEventListener("animationend", () => {

            setTimeout(() => {

                // 是魔王 先過動畫
                if (user.now_click_data.type === "boss") {
                    // render_efx_fade_out(user.now_click_data.is);

                // 給獎勵
                } else {
                    render_reward(enemy_data.reward, 0);
                    if (screen_ui.contains(weapon_column)) screen_ui.removeChild(weapon_column);
                    screen_cover.innerHTML = "";
                    battle_div.innerHTML = "";
                };
            }, 800);
        });
    };
});
// 敵人行動
function render_enemy_move() {
    render_popUp("enemy turn")
    clearTimeout(player_turn_timer);

    // 行動數據
    switch (move_of_enemy) {
        // 攻擊
        case "move_attack" :
            onslaught_bar += 1;
            battle_enemy_img.className = `${enemy_data["bg"]}-attack`;
            console.log(battle_enemy_img.className)
            // 敵人回到準備姿勢
            player_turn_timer = setTimeout(() => {
                battle_enemy_img.className = enemy_data["bg"];
            }, 800);
            // 玩家防禦
            if (player_move === "defense") {
                render_popUp("defense sucess");
                player_turn_timer = setTimeout(() => {
                    render_player_init();
                }, 1000);
            // 玩家扣血
            } else {
                render_user_state("harm", enemy_data.attack);
            }
        break;
        // 防禦
        case "move_defense":
            player_turn_timer = setTimeout(() => {
                render_player_init();
            }, 1000);
        break;
        // 集氣
        case "move_concentrate":
            onslaught_bar += 1;
            player_turn_timer = setTimeout(() => {
                render_player_init();
            }, 1000);
        break;
        // 大招
        case "move_onslaught" :
            onslaught_bar = 0;
            if (player_move === "defense") render_popUp("defense fail");
            battle_enemy_img.className = `${enemy_data["bg"]}-onslaught`;

            // 敵人回到準備姿勢
            player_turn_timer = setTimeout(() => {
                battle_enemy_img.className = enemy_data["bg"];
            }, 800);
            // 玩家扣血
            render_user_state("harm", enemy_data.attack*2);
        break;
    }   
    
    // 更新圖案
    enemy_pre_move.className = enemy_pre_data;
    enemy_now_move.className = move_of_enemy;
    enemy_pre_data = move_of_enemy;

    // 大絕招
    if (onslaught_bar >= 3) {
        move_of_enemy = "move_onslaught";
    } else {
        // 加一
        enemy_move_calculator ++;

        // 大於數列 從頭輪
        if (enemy_move_calculator >= enemy_data.order.length) {
            enemy_move_calculator = 0;
        }
        move_of_enemy = round_order[enemy_data.order[enemy_move_calculator]];
    }

    // 更新圖案
    enemy_next_move.className = move_of_enemy;
};
// 獎勵 -------------------------------------------------------
const render_reward = (rewards, index) => {

    // 加入獎勵
    render_bag_init();
    facility_div.style.display = "flex";
    facility_title.textContent = "Reward";
    facility_box.innerHTML = "";

    reward_showed = true;

    // 生成獎勵
    Object.keys(rewards).forEach((reward) => {
        if (rewards[reward] > 0) { // 檢查數量是否大於0
            const reward_slot = createDiv(0, "item_slot");
            const reward_num = createDiv(0, "bag_item_num");

            // 數量
            reward_num.textContent = rewards[reward]; 
            reward_slot.classList.add(String(reward));

            // 元素加入
            reward_slot.appendChild(reward_num);
            facility_box.appendChild(reward_slot);

            // 點擊獎勵
            reward_slot.addEventListener("click", () => {
                // 這裡要使用這個公式 請幫我調整到這個公式 適合的代碼
                const success = object_adder(user.bag, { name: reward, quantity: 1 }, user.bag_space);
    
                if (!success) {
                    render_popUp("Bag is full");
                    return;
                }
            
                render_popUp(`Added ${1} ${reward} to your bag`);
            
                // sharebox_data = [];
                // object_div.style.display = "none";
                
                // 獎勵不可操作
                render_object_detail(reward);
                object_right_div.innerHTML = "";
                
                // if (Object.keys(user.bag).length >= user.bag_space) {
                //     render_popUp("Bag is full");
                //     return;
                // }

                // // 加到背包
                // if (user.bag.hasOwnProperty(reward)) {
                //     user.bag[reward] += rewards[reward];
            
                // } else {
                //     user.bag[reward] = rewards[reward];
                // };

                render_bag_slot();

                event.target.style.display = "none";
            
                // render_popUp(`${object_title.textContent} added to bag`);

                // if (user.now_scene_data.type === "line") render_efx_fade_out(user.sceneIndex);
            });
        }
    });
};
// 理智
state_efx.addEventListener("animationend", () => {
    screen_cover.removeChild(state_efx);
if (state_efx.className === "sanity_efx") {
    render_efx_fade_out("dream_start");
} else if (state_efx.className === "dead_efx") {
    render_efx_fade_out("dead");
}
});
const render_sanity = () => {
    
    user.sanity -= 1;
    user_sanity_contain.className = "heart_jump";

    if (user.sanity <= 0) {
        attack_div.innerHTML = "";

        // 目前畫面指數
        user.last_scene_index = user.sceneIndex;
        // 假死過場
        screen_cover.appendChild(state_efx);
        
        // 打boss會直接掛掉 否則進入理智幻境
        if (enemy_data.type === "boss") {
            state_efx.className = "dead_efx";
        } else {
            state_efx.className = "sanity_efx";
        }
    } else {

    };
    user_sanity_contain.textContent = `${user.sanity} / ${user.sanity_limit}`;
};
const game_of_sanity = (choice) => {
    let sanity_answer;
    scene_ux.innerHTML = "";
    // 選擇戰鬥
    if (choice === "battle") {
        render_popUp("Allright");
        render_efx_fade_out("dream_battle");
    // 選一遊戲
    } else {
        if (Math.random() < 0.5) {
            scene_bg.className = "s1-dream-left";
            sanity_answer = "left";
        } else {
            scene_bg.className = "s1-dream-right";
            sanity_answer = "right";
        }
        setTimeout(() => {
            if (sanity_answer === choice) {
                render_popUp("You made the right choice!");
                render_efx_fade_out("dream_correct");
            } else {
                render_popUp("Wrong choice!");
                render_efx_fade_out("dream_wrong");
            }
        }, 2000);
    }
    // 理智回滿
    user.sanity = user.sanity_limit;
// 這裡要先想清楚理智遊戲輸了會如和
    // state_efx.className = "dead_efx";
};

// INVENTORY -------------------------------------------------------
// 關閉展示
let sharebox_data;
bag_close_panel.addEventListener("click", () => {

    // 重置狀態
    const reset_panel = () => {
        item_operation_panel.innerHTML = ""; // 清空操作面板
        item_operation_panel.appendChild(user_states_div); // 恢復初始內容
        bag_show = false;
        album_show = false;
        inventory_is_open = false;
        sharebox_is_open = false;

        // 收到物品
        
        if (sharebox_data && sharebox_data !== null && sharebox_data !== undefined) {
            if (sharebox_data.length > 0) render_popUp(`${now_trader} recieve ${SEL_object.name}`);
            sharebox_data = [];
            render_sharebox_slot();
        }

        sound_btn();
    };

    // 處理獎勵展示的邏輯
    if (reward_showed) {
        reward_showed = false;
        reset_panel();
        scene_ux.innerHTML = "";
        scene_bg.className = "";
        render_efx_fade_out(user.sceneIndex); // 執行淡出效果  
    }

    // 處理物件展示的邏輯
    if (object_div.style.display === "none") {
        reset_panel();
    }

    // 確保物件展示板關閉
    object_div.className = "object_div_fade";
    object_div.addEventListener("animationend", () => {
        if (object_div.className === "object_div_fade")
        object_div.style.display = "none";
        object_div.className = "";
    });

    // 啟用 UX 按鈕
    ux_button_open(true);
});
// 顯示物品
const render_object_detail = (data, quantity) => {
    
    // 初始化
    object_div.className = "";
    object_div.style.display = "flex";
    object_div.innerHTML = "";
    object_left_div.innerHTML = "";
    object_right_div.innerHTML = "";
    object_trade_div.innerHTML = "";

    // 將視圖素添加到主容器中
    object_div.append(object_left_div, object_right_div);
    object_left_div.append(object_title, object_label);
    object_right_div.append(object_trade_div, object_counter);

    // 圖片 名稱 解釋
    object_title.textContent = items_data[user_language].title[data];
    object_label.textContent = items_data[user_language].info[data];

    // 數量顯示
    object_num_text.textContent = String(obj_num_data);

    // 數量顯示
    if(quantity) init_object_number(quantity);
    // 升級按鈕文本
    // object_upgrade_btn.innerHTML = "";
    // if (user.weapon_feature[data]) {
    //     object_upgrade_btn.innerHTML = 
    //     `power: ${user.weapon_power[data]}<br>feature: ${user.weapon_feature[data]}`;
    // } else if (user.weapon_power[data]) {
    //     object_upgrade_btn.textContent = `power: ${user.weapon_power[data]}`;
    // }   
};
/**
 * @param {Array} container - 目標容器 (user.bag 或 inventory_list)
 * @param {Object} item - 要添加的物品 { name: string, quantity: number }
 * @param {Number} spaceLimit - 容器格子數量限制
 * @returns {Boolean} - 是否成功添加物品
 */
function object_adder(container, item, spaceLimit) {
    const itemLimit = items_data.effects[item.name].limit;
    let remainQuantity = item.quantity;

    // 剩餘物品計算需要多少格子
    const requiredSlots = Math.ceil(remainQuantity / itemLimit); 

    // 空間不足
    if (container.length + requiredSlots > spaceLimit) {
        return false; 
    }

    // 檢查相同物品，先填滿已有的格子
    container.forEach(exist_item => {
        if (exist_item.name === item.name && exist_item.quantity < itemLimit) {
            const availableSpace = itemLimit - exist_item.quantity;
            if (remainQuantity <= availableSpace) {
                exist_item.quantity += remainQuantity;
                remainQuantity = 0; // 完全放入
                return; // 完成
            } else {
                exist_item.quantity = itemLimit; // 填滿格子
                remainQuantity -= availableSpace; // 減少剩餘數量
            }
        }
    });

    // 逐一將剩餘物品添加到新格子
    while (remainQuantity > 0) {
        const quantityToAdd = Math.min(remainQuantity, itemLimit);
        container.push({
            name: item.name,
            quantity: quantityToAdd,
        });
        remainQuantity -= quantityToAdd;
    }

    // 成功添加所有物品
    return true;
}

// 升級系統
// object_upgrade_btn.addEventListener("click", () => {

//     // 確認是否有 Black ore
//     if (!user.bag["Black_ore"]) {
//         render_popUp("You don't have Black ore!");
//     } else if (!/bullet/.test(SEL_object)) {
//         render_popUp("Can't be upgrade");
//     } else {
//         object_upgrade_btn.innerHTML = "";
//         // 更新 weapon_power 和 weapon_feature
//         if (user.weapon_feature[SEL_object]) {
//             user.weapon_power[SEL_object] += 1;
//             user.weapon_feature[SEL_object] += 1;
//             object_upgrade_btn.innerHTML = `power: ${user.weapon_power[SEL_object]}<br>feature: ${user.weapon_feature[SEL_object]}`;
//         } else {
//             user.weapon_power[SEL_object] += 1;
//             object_upgrade_btn.innerHTML = `power: ${user.weapon_power[SEL_object]}`;
//         }

//         // 減少 Black ore 並檢查是否為零
//         user.bag["Black_ore"] -= 1;
//         if (user.bag["Black_ore"] <= 0) {
//             delete user.bag["Black_ore"]; // 移除 Black_ore
//         }
//         render_popUp(`${SEL_object} upgrade`);
//         render_bag_init();
//         object_div.style.display = "flex";
//         // 改變按鈕顏色
//         object_upgrade_btn.style.color = "red";
//         setTimeout(() => {
//             object_upgrade_btn.style.color = "gray";
//         }, 2000);
//     }
// });


// 合成系統
// 合成數據 JSON
// const craftable_list = {
//     "Meat_soup":{
//         1:["Raw_meat", "Raw_meat", "Raw_meat"], 
//         2:["Raw_meat"], 
//         3:["Raw_meat", "Raw_meat"]},
//     "Offal_soup":{
//         1:["Raw_meat", "Raw_meat", "Bloody_heart"], 
//         2:["Raw_meat", "Raw_meat", "An_eyeball"]},
// };
// const craftable_list = {
//     "Meat_soup":{
//         1:[{name:"Raw_meat", quantity:3}], 
//         2:[{name:"Raw_meat", quantity:1}], 
//         3:[{name:"Raw_meat", quantity:2}]
//     }, 
//     "Offal_soup":{
//         1:[{name:"Raw_meat", quantity:2}, {name:"Fur_pelt", quantity:1}], 
//         2:[{name:"Raw_meat", quantity:2}, {name:"Bone_piece", quantity:1}]
//     }, 
// };
function render_crafting_system() {
    
    render_bag_init();
    facility_title.textContent = "Craft";
    facility_div.style.display = "flex";
    facility_box.innerHTML = "";

    Object.keys(craftable_list).forEach(item => {

        const craftable_item = createDiv(0, "item_slot");
        craftable_item.classList.add(item);
        facility_box.appendChild(craftable_item);

        craftable_item.addEventListener("click", debounce(() => {
            
            // 物品細項
            render_object_detail(item);
            object_top_area.appendChild(object_upgrade_btn);
            SEL_object = item;
            
            // 這裡給按鈕名稱
            const obj_recipe_1_btn = createDiv("obj_recipe_1_btn", "object_btns");

            obj_recipe_1_btn.innerHTML = 
                `Recipe 1:<br> ${craftable_list[item][1].map(ingredient => 
                `${ingredient.quantity}x ${items_data[user_language].title[ingredient.name]}`)
                .join("<br>")}`;

            obj_recipe_1_btn.addEventListener("click", () => craftItem(item, 1));
            object_right_div.innerHTML = ""
            object_right_div.appendChild(obj_recipe_1_btn);

            if (craftable_list[item][2]) {
                const obj_recipe_2_btn = createDiv("obj_recipe_2_btn", "object_btns");
                // 這裡給按鈕名稱
                obj_recipe_2_btn.innerHTML = 
                `Recipe 2:<br> ${craftable_list[item][2].map(ingredient => 
                `${ingredient.quantity}x ${items_data[user_language].title[ingredient.name]}`)
                .join("<br>")}`;
                obj_recipe_2_btn.addEventListener("click", () => craftItem(item, 2));
                object_right_div.appendChild(obj_recipe_2_btn);
            }

            if (craftable_list[item][3]) {
                const obj_recipe_3_btn = createDiv("obj_recipe_3_btn", "object_btns");
                // 這裡給按鈕名稱
                obj_recipe_3_btn.innerHTML = 
                `Recipe 3:<br> ${craftable_list[item][3].map(ingredient => 
                `${ingredient.quantity}x ${items_data[user_language].title[ingredient.name]}`)
                .join("<br>")}`;
                obj_recipe_3_btn.addEventListener("click", () => craftItem(item, 3));
                object_right_div.appendChild(obj_recipe_3_btn);
            }
        }), 300);
    });
};
// 合成
function craftItem(item, recipeNumber) {
    // 取得合成配方
    const craft_required = craftable_list[item][recipeNumber];

    // 檢查足夠材料
    const hasAllItems = craft_required.every(ingredient => {
        const availableQuantity = user.bag
            .filter(bagItem => bagItem.name === ingredient.name)
            .reduce((sum, bagItem) => sum + bagItem.quantity, 0);

        return availableQuantity >= ingredient.quantity;
    });

    if (!hasAllItems) {
        render_popUp("Don't have all required items.");
        return;
    }

    // 扣除每一個材料的數量
    craft_required.forEach(requiredIngredient => {
    
        let remainingQuantity = requiredIngredient.quantity;
        
        console.log("Remain: ",remainingQuantity)

        // 遍歷 bag 中的所有物品
        for (let i = 0; i < user.bag.length; i++) {
            const bagItem = user.bag[i];
    
            if (bagItem.name === requiredIngredient.name) {
                console.log(`扣除前: ${bagItem.name}, 數量: ${bagItem.quantity}, 需扣除: ${remainingQuantity}`);
    
                if (bagItem.quantity > remainingQuantity) {
                    bagItem.quantity -= remainingQuantity;
                    remainingQuantity = 0;
                    console.log(`扣除後: ${bagItem.name}, 數量: ${bagItem.quantity}, remain: ${remainingQuantity}`);
                    break; // 所需數量已經扣完，結束
                } else {
                    remainingQuantity -= bagItem.quantity; // 扣除當前物品所有數量
                    user.bag.splice(i, 1); // 移除該物品
                    i--; // 更新索引以避免跳過下一個物品
                    console.log(`移除物品: ${bagItem.name}, remain: ${remainingQuantity}`);
                }
    
                if (remainingQuantity <= 0) {
                    break}; // 全部扣除完成
            }
        }
    });
    console.log(user.bag);
    
    // 合成物品處理
    const success = object_adder(user.bag, { name: item, quantity: 1 }, user.bag_space);

    if (!success) {
        render_popUp("Bag is full");
        return;
    }

    render_popUp(`${item} crafted successfully!`);
    render_bag_slot();
};

let able_to_sell = false;

// 商店
function render_shop_system() {

    render_bag_init();

    facility_div.style.display = "flex";
    facility_trust.style.display = "flex";
    let arr = language_array[user_language];
    facility_title.textContent = arr[now_trader];
    facility_trust.textContent = `Trust: ${user.trust[now_trader]} +`;
    facility_box.innerHTML = "";
    // user.now_scene_data mechanic

    Object.keys(shop_list).forEach(item => {
        const shop_item = createDiv(0, "item_slot");
        shop_item.classList.add(item);
        facility_box.appendChild(shop_item);

        shop_item.addEventListener("click", () => {

            able_to_sell = false;
            SEL_object = {};
            SEL_object["name"] = item;

            // 渲染細項
            render_object_detail(item, 10);

            // 購買按鈕
            object_trade_div.innerHTML = "";
            object_trade_div.appendChild(object_buy_btn);

            facility_trust.textContent = `Trust: ${user.trust[now_trader]} - ${shop_list[item]}`;
        });
        
    });
};
// 購買事件
object_buy_btn.addEventListener("click", debounce(() => {
    
    // 檢查用戶是否有足夠的信任值
    if (user.trust[now_trader] < shop_list[SEL_object.name] * obj_num_data) {
        render_popUp("Trust not enough");
        return;
    }

    const success = object_adder(user.bag, { name: SEL_object.name, quantity: obj_num_data }, user.bag_space);

    if (!success) {
        render_popUp("Bag is full");
        return;
    }

    // 提示
    render_popUp(`add ${obj_num_data} ${SEL_object.name} in your bag`);

    // 扣除信任
    user.trust[now_trader] -= shop_list[SEL_object.name] * obj_num_data;
    facility_trust.textContent = `Trust: ${user.trust[now_trader]}`;
    render_bag_slot();
}, 300));

// 儲物箱
function render_inventory_init() {
    inventory_is_open = true;

    render_bag_init();
    facility_title.textContent = "Inventory";
    facility_div.style.display = "flex";

    render_inventory_slot();
};
function render_inventory_slot() {
    facility_box.innerHTML = "";

    for (let i = 0; i < user.inventory_space; i++) {
        const inventory_item = createDiv(0, "item_slot");

        if (inventory_list[i]) {
            // 設置圖片和數量
            const item = inventory_list[i];
            inventory_item.classList.add(item.name);

            const bag_item_num = createDiv(0, "bag_item_num");
            bag_item_num.textContent = `${item.quantity}`;
            inventory_item.appendChild(bag_item_num);

            // 點擊格子
            inventory_item.addEventListener("click", () => {
                SEL_object = i; // 使用索引追蹤物品
                render_object_detail(item.name, item.quantity);

                object_trade_div.innerHTML = "";
                object_trade_div.appendChild(object_take_btn);

            });
        }

        facility_box.appendChild(inventory_item);
    }
}
object_take_btn.addEventListener("click", debounce(() => {
    if (inventory_list[SEL_object] && inventory_is_open) {

        const selectedItem = inventory_list[SEL_object];
        const success = object_adder(user.bag, { name: selectedItem.name, quantity: obj_num_data }, user.bag_space);
    
        if (!success) {
            render_popUp("Bag is full");
            return;
        }
    
        render_popUp(`Added ${obj_num_data} ${selectedItem.name} to your bag`);
    
        // 減少或刪除櫃子物品
        if (selectedItem.quantity > obj_num_data) {
            selectedItem.quantity -= obj_num_data;
        } else {
            inventory_list.splice(SEL_object, 1); // 移除空項
            object_div.style.display = "none";
        }
    
        // 更新顯示
        init_object_number(selectedItem.quantity);
        render_inventory_slot();

    } else if (sharebox_data && sharebox_is_open) {
        const selectedItem = sharebox_data[0];
        const success = object_adder(user.bag, { name: selectedItem.name, quantity: 1 }, user.bag_space);
    
        if (!success) {
            render_popUp("Bag is full");
            return;
        }
    
        render_popUp(`Added ${1} ${selectedItem.name} to your bag`);
    
        sharebox_data = [];
        object_div.style.display = "none";
    
        // 更新顯示
        init_object_number(selectedItem.quantity);
        render_sharebox_slot();
    }
    render_bag_slot();
}, 300));

// 郵箱
function render_sharebox_init() {

    
    render_bag_init();
    sharebox_is_open = true;
    facility_title.textContent = "Share";
    facility_div.style.display = "flex";

    render_sharebox_slot();
}
function render_sharebox_slot() {

    facility_box.innerHTML = "";
    const sharebox_slot = createDiv(0, "item_slot");
    facility_box.appendChild(sharebox_slot);
    console.log(sharebox_data)
    if (!sharebox_data) return;
    if (sharebox_data.length > 0) {
        sharebox_slot.classList.add(sharebox_data[0].name);
        console.log(sharebox_data[0].name);

        // 點擊格子
        sharebox_slot.addEventListener("click", () => {
            SEL_object = sharebox_data[0]; // 使用索引追蹤物品
            render_object_detail(sharebox_data[0].name, 1);

            object_trade_div.innerHTML = "";
            object_trade_div.appendChild(object_take_btn);
        });
    }

    
}

// BAGPACK -------------------------------------------------------

// 包包按鈕
btn_bag.addEventListener("click", debounce(() => {
    if (bag_show) {
        bag_close_panel.click();
    } else {
        render_bag_init(); // 顯示 bag
        // SD_5.play();
    }
}, 300));
// 包包初始
const render_bag_init = () => {

    bag_show = true;
    ux_button_open(false);

    object_div.style.display = "none";
    facility_div.style.display = "none";
    facility_trust.style.display = "none";
    item_operation_panel.innerHTML = "";

    // 將一切加入容器中
    item_operation_panel.append(bag_close_panel, user_states_div, bag_div, object_div, facility_div);
    screen_bg.appendChild(item_operation_panel);
    
    // 更新物品
    render_bag_slot();
};
// 重整包包
function render_bag_slot() {

    bag_inventory.innerHTML = "";

    // 更新槽位
    for (let i = 0; i < user.bag_space; i++) {

        const item_slot = createDiv(0, "item_slot");

        // 如果有物品
        if (user.bag[i]) {
            const item = user.bag[i];

            // 設置圖片和數量
            item_slot.classList.add(item.name);
            const bag_item_num = createDiv(0, "bag_item_num");
            bag_item_num.textContent = `${item.quantity}`;
            item_slot.appendChild(bag_item_num);

            // 點擊格子
            item_slot.addEventListener("click", () => {
                if (!item) return;
                SEL_object = item;
                // 儲物箱
                if (inventory_is_open === true) {
                    const success = object_adder(inventory_list, { name: item.name, quantity: item.quantity }, user.inventory_space);
            
                    if (!success) {
                        render_popUp("Inventory is full");
                        return;
                    }

                    // 刪除包裡物品
                    user.bag.splice(i, 1);
                    render_inventory_slot();
                    render_bag_slot();

                } else if (sharebox_is_open === true) {
                // 給物箱  

                    // 空間不足
                    if (sharebox_data && sharebox_data !== null && sharebox_data !== undefined) {
                        if (sharebox_data.length > 0) {
                            render_popUp(`already have stuff`)
                            return;
                        }
                    }
                    
                    // 刪除包裡物品
                    if (item.quantity <= 1) {
                        user.bag.splice(i, 1);
                    } else {
                        item.quantity -= 1;
                    }

                    sharebox_data = [{name: item.name, quantity: 1,}];
                    render_popUp(`share 1 ${item.name}`)
                    render_sharebox_slot();
                    render_bag_slot();
                // 展示物品
                } else {
                // 初始面板
                    render_object_detail(item.name, item.quantity);
                    
                    // 是交易的話
                    if (facility_trust.style.display === "flex") {

                        able_to_sell = true;
                        object_trade_div.appendChild(object_sell_btn);
                        facility_trust.textContent = `Trust: ${user.trust[now_trader]} + ${price_list[item.name]}`;
                    } else {
                    // 非交易
                        object_trade_div.append(object_use_btn, object_delet_btn);
                    }
                }
            });
        }

        // 停止新增
        if (bag_inventory.children.length >= user.bag_space) {
            break;
        } else {
            bag_inventory.appendChild(item_slot);
        }
    }
};
// 刪除物品
object_delet_btn.addEventListener("click", debounce(() => {

    // 減少物品
    if (SEL_object.quantity > obj_num_data) {
        SEL_object.quantity -= obj_num_data;
    } else {

    // 刪除物品
        user.bag.splice(user.bag.indexOf(SEL_object), 1); // 移除空項
        object_div.style.display = "none";
    }

    init_object_number(SEL_object.quantity);
    render_bag_slot();

}, 300));
// 賣物品
object_sell_btn.addEventListener("click", debounce(() => {

    // 減少物品
    if (SEL_object.quantity > obj_num_data) {
        SEL_object.quantity -= obj_num_data;
    } else {
        
    // 刪除物品
        user.bag.splice(user.bag.indexOf(SEL_object), 1); // 移除空項
        object_div.style.display = "none";
    }

    // 重整數量
    user.trust[now_trader] += (price_list[SEL_object.name] * obj_num_data);
    console.log(price_list[SEL_object.name], SEL_object.name)
    facility_trust.textContent = `Trust: ${user.trust[now_trader]}`;
    init_object_number(SEL_object.quantity);
    render_bag_slot(price_list[SEL_object]);
    

}, 300));
// 使用該物品
object_use_btn.addEventListener("click", () => {
    
    // 減少物品
    if (SEL_object.quantity > obj_num_data) {
        SEL_object.quantity -= obj_num_data;
    } else {

    // 刪除物品
        user.bag.splice(SEL_object, 1); // 移除空項
        object_div.style.display = "none";
    }
});
// 物品計算器
function init_object_number(limit) {
    obj_num_data = 1;
    obj_num_limit = limit;
    update_object_number_display();
}
// 更新數量顯示
function update_object_number_display() {

    object_num_text.textContent = String(obj_num_data);

    let operator;
    let trust_change;

    if (able_to_sell) {
        operator = '+';
        trust_change = price_list[SEL_object.name] * obj_num_data;
    } else {
        operator = '-';
        trust_change = shop_list[SEL_object.name] * obj_num_data;
    }

    facility_trust.textContent = `Trust: ${user.trust[now_trader]} ${operator} ${trust_change}`;
};
// 加法
object_num_add.addEventListener("click", debounce(() => {
    if (obj_num_data < obj_num_limit ) {
        obj_num_data += 1
    } else {
        obj_num_data = 1;
    }
    update_object_number_display();
}), 300);
// 減法
object_num_sub.addEventListener("click", debounce(() => {
    if (obj_num_data > 1 ) {
        obj_num_data -= 1;
    } else {
        obj_num_data = obj_num_limit;
    };
    update_object_number_display();
}), 300);

// 相簿按鈕
btn_album.addEventListener("click", debounce(() => {
    if (album_show) {
        bag_close_panel.click();
    } else {
        render_album_init(); // 顯示 bag
        // SD_5.play();
    }
}, 300));
let album_show = false;
// 相簿初始
const render_album_init = () => {

    album_show = true;
    ux_button_open(false);

    object_div.style.display = "none";
    facility_div.style.display = "none";
    facility_trust.style.display = "none";
    item_operation_panel.innerHTML = "";

    // 將一切加入容器中
    item_operation_panel.append(bag_close_panel, user_states_div, album_div, object_div, facility_div);
    screen_bg.appendChild(item_operation_panel);
    
    // 更新物品
    render_album_slot();
};
// 重整相簿
function render_album_slot() {

    album_inventory.innerHTML = "";

    // 更新槽位
    for (let i = 0; i < user.album.length; i++) {

        const item_slot = createDiv(0, "item_slot");

        // console.log(user.album[i].name)
        // 如果有物品
        if (user.album[i]) {
            const item = user.album[i];

            // 設置圖片和數量
            item_slot.classList.add(item.name);

            // 點擊格子
            item_slot.addEventListener("click", () => {
                if (!item) return;
                SEL_object = item;
                // 初始面板
                render_object_detail(item.name);
                object_right_div.innerHTML = "";
                object_right_div.appendChild(object_album_btn);
                object_album_btn.className = item.name;
            });
        }
        // 停止新增
        album_inventory.appendChild(item_slot);
    }
};

// BUTTONS -------------------------------------------------------
// 對話

lines_btn.addEventListener("click", debounce(() => {
    new_line(user.line_length);
}, 300));
// 略過對話
const startPassTimer = () => {
    lines_pass_btn.className = "lines_passing";
    passTimer = setTimeout(() => {
        user.line_length = 0;
        new_line(user.line_length);
        lines_pass_btn.className = "";
    }, 500);
};
const cancelPassTimer = () => {
    lines_pass_btn.className = "";
    clearTimeout(passTimer);
};
// 支援手機和滑鼠
lines_pass_btn.addEventListener("mousedown", startPassTimer);
lines_pass_btn.addEventListener("touchstart", startPassTimer);
// 移開時取消計時器
lines_pass_btn.addEventListener("mouseup", cancelPassTimer);
lines_pass_btn.addEventListener("mouseleave", cancelPassTimer);
lines_pass_btn.addEventListener("touchend", cancelPassTimer);
lines_pass_btn.addEventListener("touchcancel", cancelPassTimer);

// OTHERS -------------------------------------------------------
const sound_btn = () => {
    // SD_1.currentTime = 0;
    // SD_1.play();
};
// 創建元素
function createDiv(nameId, nameClass) {
    const itemModel = document.createElement("div");
    if (nameId) { itemModel.id = nameId; }
    if (nameClass) { itemModel.className = nameClass; }
    return itemModel;
};
// 防止二次點擊
function debounce(callbackFunction, delayTime = 100) {
    let timerId;
    return (...functionArguments) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => callbackFunction.apply(this, functionArguments),
            delayTime);
    };
};

// 滑鼠
const cursor = createDiv("cursor");
screen.appendChild(cursor);
cursor.style.display = "none";
function showCursor(event) {
    cursor.style.display = "flex";
    cursor.className = "click_anim";
    const { pageX, pageY } = event;
    cursor.style.left = `${pageX - cursor.offsetWidth / 2}px`;
    cursor.style.top = `${pageY - cursor.offsetHeight / 2}px`;
    const timer = setTimeout(() => {
        cursor.style.display = "none";
        clearTimeout(timer);
    }, 200);
}

// 電腦使用 mousedown 事件
document.addEventListener("mousedown", showCursor);
document.addEventListener("touchstart", (event) => {
    // 使用第一個觸控點的座標
    showCursor(event.touches[0]);
});

