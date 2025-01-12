// scene1.js

// let s_item = [];
const start_locat = { x:10, y:10 };
const mapData = [
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","S_LM2","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","NS_LS2","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","NS_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","SE_0000","WE_0000","WE_0000","WE_0000","NW_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","NS_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","NS_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","E_0000","NSWE_LM1","W_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","N_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"],
    ["x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000","x_0000"]
  ];

let s_data, s_lines, s_mechanic_line, s_hospital_line, s_corpse_line, s_landscape_line;

import { user_language } from "/src/model/setting.js";

// 語言更新
let lines_JSON;
async function load_language() {
    try {
        switch (user_language) {
            case "EN":
                lines_JSON = await import('/src/data/lines_EN.json');
                break;
            case "ES":
                lines_JSON = await import('/src/data/lines_ES.json');
                break;
            case "CH":
                lines_JSON = await import('/src/data/lines_CH.json');
                break;
            default:
                lines_JSON = await import('/src/data/lines_EN.json');
                return;
        }
    } catch (error) {
        console.error("Error loading JSON file:", error);
    }
};

// 隨機函數器
function random_num(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 載入 JSON 數據
let dungeon_data = null;
import dungeonData from '/src/data/dungeon.json';
async function loadDungeonData() {
    try {
        // 使用靜態導入的 JSON 數據
        if (!dungeonData) throw new Error('Dungeon data is undefined!');

        // 賦值到全域變數或進一步處理
        dungeon_data = dungeonData;
    } catch (error) {
        console.error('Error loading dungeon data:', error);
    }
}
// 載入樣式
import "/src/view/scene1.scss";

// 讀取數據器
function get_random_data(type) {
    if (!dungeon_data || !dungeon_data[type]) {
        console.error(`Data for type "${type}" is not available.`);
        return null;
    }
    const keys = Object.keys(dungeon_data[type]);
    const randomKey = keys[random_num(0, keys.length - 1)];
    return dungeon_data[type][randomKey];
}

// 物品列表
const effects = {
    "Flint_stone": { "low": 5, "high": 15, "limit": 5, "is": "attack", "attack": 1 },
    "Bone_piece": { "low": 5, "high": 15, "limit": 5, "is": "attack", "attack": 2 },
    "Fur_pelt": { "low": 5, "high": 15, "limit": 5, "is": "attack", "attack": 1 },
    // "Glass_bottle": { "low": 5, "high": 15, "limit": 5, "is": "attack", "attack": 2 },
    "Raw_meat": { "low": 5, "high": 15, "limit": 5, "is": "heal", "heal": 1 },
};

// 生成 item_list
const item_list = Object.keys(effects);

// 隨機物品
function create_reward() {

    const level = 1; // 等級 1
    const num_range = level >= 2 ? [2, 3] : [1, 2];
    const reward = {};
    const add_items = [];

    // 隨機選取兩個物品名稱
    while (add_items.length < 2) {
        const randomItem = item_list[random_num(0, item_list.length - 1)];
        if (!add_items.includes(randomItem)) {
            add_items.push(randomItem);
        }
    }

    // 分配隨機數量
    add_items.forEach(item => {
        reward[item] = random_num(num_range[0], num_range[1]);
    });

    return reward;
}

const rows = mapData.length; // 直排
const cols = mapData[0].length; // 橫排
let rand_map_arr = {};

// 初始地圖
async function render_randomMap() {

    if (!dungeon_data) {
        console.error('Dungeon data is not loaded yet.');
        return;
    }

    // 生成細項
    let enemy_data = get_random_data('enemy');
    let lostbag_data = get_random_data("lostbag");

    if (!enemy_data || !lostbag_data) {
        console.error("數據加載失敗，請檢查 JSON 資料來源。");
        return;
    }

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = mapData[y][x];
    
            // 如果 'x_0000'，跳過
            if (cell === 'x_0000') continue;
    
            // 隨機怪物
            function render_map_event() {
                let random_event;
    
                // 隨機分配
                if (Math.random() < 0.2) {
                    random_event = "lostbag";
                } else {
                    random_event = "enemy";
                }
    
                switch (random_event) {
                    case "lostbag":
                        // 生成拾取物品
                        return {
                            type: "item",
                            x: 8,
                            y: 20,
                            w: 36,
                            h: 25,
                            bg: lostbag_data.bg,
                            is: lostbag_data.is,
                            reward: { ...create_reward() },
                        };
                    case "enemy":
                        // 生成敵人
                        return {
                            type: "enemy",
                            name: enemy_data.name,
                            order: enemy_data.order,
                            attack: enemy_data.attack,
                            x: 13,
                            y: 33,
                            w: 25,
                            h: 25,
                            heart: enemy_data.heart,
                            carapace: enemy_data.carapace,
                            flexibility: enemy_data.flexibility,
                            anger: enemy_data.anger,
                            like: enemy_data.like,
                            reward: { ...create_reward() },
                            bg: enemy_data.bg,
                        };
                }
            }
    
            // 陣列模板
            rand_map_arr[`${y},${x}`] = {
                type: "room",
                btn: {},
                bg: {},
                ux: [],
                efx: "dark",
            };
    
            // 判斷是否含有 'E', 'W', 'N', 'S'
            const rpCell = cell.replace(/\(.*\)/, "");
            
            // 設置背景
            render_map_wall(rpCell, x, y, cols, rows);
    
            // 設置背景
            const bg = rand_map_arr[`${y},${x}`].bg;
            const walls = ['N', 'E', 'S', 'W'].filter(dir => bg[dir]?.includes('map_wall_')).length;
            // console.log("walls", walls)
            // 生成事件（牆壁少於 3 面時）
            if (Math.random() < 0.8 && !cell.includes("L") && walls < 3) {
                const mapEvent = render_map_event();
                if (mapEvent) {
                    rand_map_arr[`${y},${x}`].ux.push(mapEvent);
                }
            }
            // 特定場景
            render_special_scene(cell, y, x, rand_map_arr);
        }
    }
};
// 設置背景跟通道
function render_map_wall(rpCell, x, y, cols, rows) {
    // 提取 NESW 四個數字
    const bgKey = rpCell.split('_')[1]; // 提取後面的 "0000"
    const directions = ['N', 'E', 'S', 'W']; // NESW 順序

    // if (!bgKey || bgKey.length !== 4) {
    //     console.error("rpCell 格式錯誤，無法解析背景數字：", rpCell);
    //     return;
    // }

    // 方向設置按鈕與背景
    directions.forEach((dir, index) => {
        const value = parseInt(bgKey[index]); // 取對應方向的數字
        switch (dir) {
            case 'N':
                if (rpCell.includes("N") && y > 0) {
                    rand_map_arr[`${y},${x}`].btn.N = `${y - 1},${x}`;
                    rand_map_arr[`${y},${x}`].bg.N = `map_aisle_${value}_${random_num(1, 2)}`;
                }
                break;
            case 'E':
                if (rpCell.includes("E") && x < cols - 1) {
                    rand_map_arr[`${y},${x}`].btn.E = `${y},${x + 1}`;
                    rand_map_arr[`${y},${x}`].bg.E = `map_aisle_${value}_${random_num(1, 2)}`;
                }
                break;
            case 'S':
                if (rpCell.includes("S") && y < rows - 1) {
                    rand_map_arr[`${y},${x}`].btn.S = `${y + 1},${x}`;
                    rand_map_arr[`${y},${x}`].bg.S = `map_aisle_${value}_${random_num(1, 2)}`;
                }
                break;
            case 'W':
                if (rpCell.includes("W") && x > 0) {
                    rand_map_arr[`${y},${x}`].btn.W = `${y},${x - 1}`;
                    rand_map_arr[`${y},${x}`].bg.W = `map_aisle_${value}_${random_num(1, 2)}`;
                }
                break;
        }

        // 設置背景
        if (!rand_map_arr[`${y},${x}`].bg.N) {
            rand_map_arr[`${y},${x}`].bg.N = `map_wall_${value}`;
        }
        if (!rand_map_arr[`${y},${x}`].bg.S) {
            rand_map_arr[`${y},${x}`].bg.S = `map_wall_${value}`;
        }
        if (!rand_map_arr[`${y},${x}`].bg.W) {
            rand_map_arr[`${y},${x}`].bg.W = `map_wall_${value}`;
        }
        if (!rand_map_arr[`${y},${x}`].bg.E) {
            rand_map_arr[`${y},${x}`].bg.E = `map_wall_${value}`;
        }
    });
    // console.log(rand_map_arr[`${y},${x}`].bg, bgKey)
};
// 特定場景
function render_special_scene(cell, row, col, rand_map_arr) {
    if (cell.includes("LM1")) {
        rand_map_arr[`${row},${col}`].bg.N = `map_aisle_0_${random_num(1, 2)}`;
        rand_map_arr[`${row},${col}`].bg.S = `s1-home-1`;
        rand_map_arr[`${row},${col}`].bg.E = `s1-home-2`;
        rand_map_arr[`${row},${col}`].bg.W = `s1-home-3`;

        rand_map_arr[`${row},${col}`].S = [{ x: 10, y: 55, w: 20, h: 20, type: "unique", is: "craft" }];
        rand_map_arr[`${row},${col}`].E = [{ x: 10, y: 55, w: 20, h: 20, type: "unique", is: "inventory" }];
        rand_map_arr[`${row},${col}`].W = [{ x: 10, y: 55, w: 20, h: 20, type: "unique", is: "shop", who: "base" }];
    } else if (cell.includes("LM2")) {
        rand_map_arr[`${row},${col}`].bg.N = `s1-mechanic-1`;
        rand_map_arr[`${row},${col}`].bg.E = `map_wall_0`;
        rand_map_arr[`${row},${col}`].bg.S = `map_wall_0`;
        rand_map_arr[`${row},${col}`].bg.W = `map_wall_0`;
    } else if (cell.includes("LS2")) {
        rand_map_arr[`${row},${col}`].bg.N = `s1-mechanic-2`;
        rand_map_arr[`${row},${col}`].bg.E = `map_wall_0`;
        rand_map_arr[`${row},${col}`].bg.S = `map_aisle_0_1`;
        rand_map_arr[`${row},${col}`].bg.W = `map_wall_0`;
        
        rand_map_arr[`${row},${col}`].N = [
            { x: 25, y: 25, w: 20, h: 10, type: "npc", is: 0, name: "Mechanic", lyric: "mechanic" },
            { x: 38, y: 40, w: 6, h: 6, type: "unique", is: "sharebox", bg:"share_box" }
        ];
    }
};

// 主流程
async function main() {
    await loadDungeonData(); // 等待數據載入完成
    await render_randomMap(); // 等待地圖初始化完成
}

// 地牢生成場景器
export const s_init = async () => { 
    console.log("Initializing scene...");

    await load_language();

    if (!lines_JSON) {
        console.error("lines_JSON 加載失敗");
        return;
    }

    await main(); // 確保地圖初始化完成
    if (!Object.keys(rand_map_arr).length) {
        console.error("rand_map_arr 尚未初始化");
        return;
    }

    s_lines = lines_JSON.s_main_line;
    s_mechanic_line = lines_JSON.s_mechanic_line;
    s_hospital_line = lines_JSON.s_hospital_line;
    s_corpse_line = lines_JSON.s_corpse_line;
    s_landscape_line = lines_JSON.s_landscape_line;
    s_data = {
        0:{ type: "line", bg: "", is:`${start_locat.x},${start_locat.y}`},
        ...rand_map_arr,
        dream_start:{ type: "line", bg: "s1-dream", is:"dream_choice"},
        dream_choice:{ type: "view", bg: "s1-dream-choice", ux: [
            { x:8, y:58, w:8, h:8, type:"choice", is:"left", bg:"",},
            { x:38, y:58, w:8, h:8, type:"choice", is:"right", bg:"",},
            { x:25, y:68, w:8, h:8, type:"choice", is:"battle", bg:"sanity_choice_battle"},
        ]},
        dream_battle:{ type: "view", bg: "s1-dream", ux: 
            [ { type:"boss", speed:2000, power:9, heart:2, is:"dream_win", bg:"s1-dream-enemy"} ],  
        },
        dream_win:{ type: "line", bg: "s1-dream", is:"return", reward:{ ground_meat: 2, ground_meat: 2, ground_meat: 2,}},
        dream_correct:{ type: "line", bg: "s1-dream", is:"return"},
        dream_wrong:{ type: "line", bg: "s1-dream", is:"dead"},

        dead:{ type: "end", bg: "", dead:"dead in fight"},
    };
    // console.log("s_data 初始化完成:", s_data);
};

// 等待上面的執行完成才會輸出
export { 
    start_locat,
    mapData,
    s_data, 
    s_lines, 
    s_mechanic_line, 
    s_hospital_line, 
    s_corpse_line, 
    s_landscape_line,
}