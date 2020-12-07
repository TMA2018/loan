export default class Forms {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'loading',
            success: 'thank you. we call you',
            failure: 'sorry. we have a error'
        };
        this.path = 'assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach( input => {
            input.value = '';
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');

        mailInputs.forEach( input => {
            input.addEventListener('keypress', function(evt) {
                if (evt.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    evt.preventDefault();
                }
            });
        });
    }

    initPhoneMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }           
        };
    

        function createMask(evt) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
            if (def.length >= val.length) {
                val = def;
            }
            this.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
            if (evt.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                this.setCursorPosition(this.value.length, this);
            }
        }
        let inputs = document.querySelectorAll('[name="phone"]');
        inputs.forEach( input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async sendForm(url, data){
        const res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    }

    init() {
        this.checkMailInputs();
        this.initPhoneMask();
        this.forms.forEach(form => {
            form.addEventListener('submit', (evt) => {
                evt.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: gray;
                `;
                form.parentNode.appendChild(statusMessage);
                statusMessage.textContent = this.message.loading;
                let formData = new FormData(form);
                this.sendForm(this.path, formData)
                    .then(res => {
                        console.log(this.path);
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    }).
                    finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });
            });    
        });
    }
/*
    requaire(e) {
        e.preventDeafault();
        let formData = new FormData(this.forms);
        let obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        //let json = JSON.stringify(obj);
        this.sendForm('../../assets/question.php', obj);
    }*/
}