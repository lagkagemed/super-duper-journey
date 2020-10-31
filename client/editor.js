class Editor {
    constructor() {
        const editorHeader = document.getElementById("editor-header");
        const editorText = document.getElementById("editor-text");
        editorHeader.style.fontSize = min(windowWidth, windowHeight) / 30 + "px";
        editorText.style.fontSize = min(windowWidth, windowHeight) / 40 + "px";
        this.editorHeader = editorHeader;
        this.editorText = editorText;

        let editor = document.getElementById("editor");
        editor.style.visibility = "visible";
    }

    menuMain() {
        this.editorHeader.innerHTML =
            "Welcome to the Super Duper Editor";

        this.editorText.innerHTML =
            "Here is all the information you need to create your dream world." + "<br>" +
            "<br>" +
            "Press:" + "<br>" +
            "<br>" +
            "1 = Normal mode." + "<br>" +
            "2 = No clip mode." + "<br>" +
            "<br>" +
            "[?] = Add something. (not ready)" + "<br>" +
            "[?] = Remove something. (not ready)" + "<br>" +
            "<br>" +
            "[?] = Load world. (not ready)" + "<br>" +
            "[?] = Save world. (not ready)";
    }

    handleKeyPresed(key) {
        switch (key) {
            case 48: // 0
            case 96: // 0

                break;

            case 49: // 1
            case 97: // 1
                noClip = false;
                break;

            case 50: // 2
            case 98: // 2
                noClip = true;
                break;

            case 51: // 3
            case 99: // 3

                break;
            case 52: // 4
            case 100: // 4

                break;
            case 53: // 5
            case 101: // 5

                break;
            case 54: // 6
            case 102: // 6

                break;
            case 55: // 7
            case 103: // 7

                break;
            case 56: // 8
            case 104: // 8

                break;
            case 57: // 9
            case 105: // 9

                break;
            default:
        }
    }
}