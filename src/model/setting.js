// SETTING & language

// 語言
export let user_language = "EN";

const englishBtn = document.querySelector("#EN");
const traditionalBtn = document.querySelector("#CH");
const enImg = document.querySelector(".EN");
const chImg = document.querySelector(".CH");

export const language_array = {
    "EN":{
        "set_language":"LANGUAGE",
        "set_volume":"VOLUME",
        "set_save":"SAVE",
        "set_achievements":"Achievements",
        "set_credits":"CREDITS",
        "set_share":"SHARE",
        "set_exit":"EXIT",

        "lines_pass_btn": "SKIP",
        "reject_reward_btn": "Reject All",
        "end_turn_btn": "End Turn",
        "end_retry": "Retry",
        "bag_title": "Pocket",
        "album_title": "Album",
        "map_locat_title": "Location",

        "object_buy_btn": "Buy",
        "object_take_btn": "Take",
        "object_sell_btn": "Sell", 
        "object_use_btn": "Use",
        "object_delet_btn": "Delete",
        "object_give_btn": "Give",
        "object_ask_btn": "Ask",
        "harvey":"Harvey",
        "base": "Base",
        "mechanic": "Mechanic",
        "cook": "Cook",
        "painter": "Painter",
    },
    "CH": {
        "set_language": "語言",
        "set_volume": "音量",
        "set_save": "保存",
        "set_achievements": "成就",
        "set_credits": "製作人員",
        "set_share": "分享",
        "set_exit": "退出",

        "lines_pass_btn": "跳過",
        "reject_reward_btn": "全部拒絕",
        "end_turn_btn": "結束回合",
        "end_retry": "重試",
        "bag_title": "口袋",
        "album_title": "相簿",
        "map_locat_title": "地點",
        
        "object_buy_btn": "購買",
        "object_take_btn": "帶走",
        "object_sell_btn": "出售",
        "object_use_btn": "使用",
        "object_delet_btn": "刪除",
        "object_give_btn": "給予",
        "object_ask_btn": "詢問",
        "harvey": "哈維",
        "base": "基地",
        "mechanic": "機械師",
        "cook": "廚子",
        "painter": "漆工",

    }
};

englishBtn.addEventListener("click", () => {
    user_language = "EN";
    traditionalBtn.style.display = "none";
    chImg.style.display = "none";
    load_set_text();
});
traditionalBtn.addEventListener("click", () => {
    user_language = "CH";
    englishBtn.style.display = "none";
    enImg.style.display = "none";
    load_set_text();
});


// 設定
export { set_div, set_btn, render_set };

const set_btn = createDiv("set_btn");
const set_div = createDiv("set_div");
const set_volume = createDiv("set_volume", "set_topic");
const set_save = createDiv("set_save", "set_topic");
const set_achievements = createDiv("set_achievements", "set_topic");
const set_language = createDiv("set_language", "set_topic");
const set_credits = createDiv("set_credits", "set_topic");
const set_share = createDiv("set_share", "set_topic");
const set_exit = createDiv("set_exit", "set_topic");

const set_detail = createDiv("set_detail");
const set_title = createDiv("set_title");
const set_label = createDiv("set_label");

// 主題細項
const save_slot_1 = createDiv("save_slot_1");
const save_slot_2 = createDiv("save_slot_2");

const volume_add = createDiv("volume_add", "volume_btn", ">");
const volume_sub = createDiv("volume_sub", "volume_btn", "<");
const volume_text = createDiv("volume_text", 0, "1");

set_div.append(
    set_volume, set_save, set_achievements, set_language, 
    set_credits, set_share, set_exit, set_detail);

set_div.style.zIndex = -1;


// 載入文字
set_div.style.display = "none";
function load_set_text() {
    let arr = language_array[user_language];
    set_language.textContent = arr.set_language;
    set_volume.textContent = arr.set_volume;
    set_save.textContent = arr.set_save;
    set_achievements.textContent = arr.set_achievements;
    set_credits.textContent = arr.set_credits;
    set_share.textContent = arr.set_share;
    set_exit.textContent = arr.set_exit;
};
load_set_text();


let set_show = false;
const render_set = () => { 
    if (set_show) {
        set_div.style.display = "none";
        // set_div.style.zIndex = -1; // 隱藏 set
    } else {
        set_div.style.display = "flex";
        set_div.style.zIndex = 1; // 顯示 set
        set_btn.style.zIndex = 2;
        // set_content.textContent = ""
        // end_share.textContent = user.golbal_arr.end[0][1];
        // end_retry.textContent = "";
        // end_retry.textContent = user.golbal_arr.end[0][2];
    }
    set_show = !set_show;
};
const render_setting_details = () => {
    set_detail.innerHTML = "";
    set_label.textContent = "";
    set_detail.append(set_title, set_label);
};

set_btn.addEventListener("click", debounce(() => {
    render_set();
}, 300));
function debounce(callbackFunction, delayTime = 100) {
    let timerId;
    return (...functionArguments) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => callbackFunction.apply(this, functionArguments),
            delayTime);
    };
};

set_volume.addEventListener("click", () => {
    render_setting_details();
    set_title.textContent = "Volume";
    const volume_div = createDiv("volume_div");
    volume_div.innerHTML = "";
    volume_div.append(volume_sub, volume_text, volume_add);
    set_detail.appendChild(volume_div);
});
set_save.addEventListener("click", () => {
    render_setting_details();
    set_title.textContent = "Save Slot";
    set_label.textContent = "Demo has no saving system";
    // set_detail.append(save_slot_1, save_slot_2);
    // save_slot_1.textContent = `1`;
    // save_slot_2.textContent = `2`;
});
set_achievements.addEventListener("click", () => {
    render_setting_details();
    set_title.textContent = "Achievements";
    render_achieve();
    // set_label.textContent = "Click and point to interact with game";
});
set_language.addEventListener("click", () => {
    render_setting_details();
    set_title.textContent = "Language";
    set_label.textContent = "English";
});
set_credits.addEventListener("click", () => {
    render_setting_details();
    set_title.textContent = "Credits";
    set_label.textContent = "Made by L";
});
set_share.addEventListener("click", () => {
    render_setting_details();
    set_title.textContent = "Share";
    set_label.textContent = "https://heartfelt-starburst-a8e758.netlify.app/";
});
set_exit.addEventListener("click", () => {
    render_setting_details();
    set_title.textContent = "Exit";
    set_label.textContent = "To exit, just close the window";
});

let volume_value = 1;
let volume_limit = 5;
volume_add.addEventListener("click", () => {
    if (volume_value < volume_limit ) volume_value +=1;
    volume_text.textContent = String(volume_value);
});
volume_sub.addEventListener("click", () => {
    if (volume_value > 0 ) volume_value -=1;
    volume_text.textContent = String(volume_value);
});

const render_achieve = () => {
    const achieve_slot = createDiv(0, "achieve_slot");
    achieve_slot.textContent = "die alone"
    set_detail.appendChild(achieve_slot);
};

function createDiv(nameId, nameClass, text) {
    const itemModel = document.createElement("div");
    if (nameId) { itemModel.id = nameId; }
    if (nameClass) { itemModel.className = nameClass; }
    if (text) { itemModel.textContent = text; }
    return itemModel;
};