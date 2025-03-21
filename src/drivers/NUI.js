import axios from 'axios';

const debug = false

const removeListener = (array, func) => {
    if(array) {
        const index = array.indexOf(func)
        if(index !== -1) {
            array.splice(index, 1)
        }
    }
}

export default class NUI {
    static events = {}
    static keysDown = {}
    static keysUp = {}

    static addKeyDownListener = (key, func) => {
        NUI.keysDown[key] = NUI.keysDown[key] || []
        NUI.keysDown[key].push(func)
    }

    static removeKeyDownListener = (key, func) => {
        removeListener(NUI.keysDown[key], func)
    }

    static addKeyUpListener = (key, func) => {
        NUI.keysUp[key] = NUI.keysUp[key] || []
        NUI.keysUp[key].push(func)
    }

    static removeKeyUpListener = (key, func) => {
        removeListener(NUI.keysUp[key], func)
    }

    static addMessageListener = (event, func) => {
        NUI.events[event] = NUI.events[event] || []
        NUI.events[event].push(func)
    }

    static removeMessageListener = (event, func) => {
        removeListener(NUI.events[event], func)
    }

    static void_post = ({event = '', rsc = 'vrp', data = {}}) => {
        axios.post(`https://${rsc}/${event}`, data).then().catch()
    }

    static post = ({event = '', rsc = 'vrp', data = {}}) => {
        return new Promise((resolve, reject) => {
            axios.post(`https://${rsc}/${event}`, data).then(({data}) => {resolve(data)}).catch(error => {reject(error)})
        })
    }

    static initListeners = () => {
        console.log('NUI listeners are SET')
        window.addEventListener('message', ({data}) => {
            if(debug)
                console.log(JSON.stringify(data, null, 2))
            const {event, payload} = data
            if(event === 'keydown' || event === 'keyup') {
                const {key} = payload
                const arr = event === 'keydown' ? 'keysDown' : 'keysUp'
                if(NUI[arr][key]) {
                    NUI[arr][key].forEach(el => {
                        el()
                    })
                }
            }else if(NUI.events[event]) {
                NUI.events[event].forEach(el => {
                    el(payload)
                })
            }
        })
    }

    static emitEvent(event, payload) {
        window.dispatchEvent(new MessageEvent("message", {
            data: {event, payload}
        }))
    }
}

// NUI.addMessageListener('test', (d) => {
//     console.log(JSON.stringify(d)) -- json only to watch
// })

// NUI.addKeyDownListener(51, () => {
//     NUI.post({event : 'test', rsc : 'ui', data : {test : 'true'}}).then(r => {
//         console.log(JSON.stringify(r)) -- json only to watch
//     })
// })
// NUI.addKeyUpListener(51, () => {
// })

NUI.addMessageListener("start",function (){
    console.log("MSG Listener")
})