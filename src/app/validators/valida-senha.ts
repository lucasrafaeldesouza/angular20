import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validaSenhaForte(): ValidatorFn {

    return (control: AbstractControl) : ValidationErrors | null => {
        const password = control.value

        if(!password) {
            return null
        }

        const caractererMaiusculo = /[A-Z]+/.test(password);
        const caractererMinusculo = /[a-z]+/.test(password);
        const valNumericos = /[0-9]+/.test(password);
        const passwordLength = password.length >= 8;
        const caractererEspecial = /\W|_/.test(password);
        const senhaForte = caractererMaiusculo && caractererMinusculo && valNumericos && passwordLength && caractererEspecial;

        return !senhaForte ? { senhaFraca: true } : null;

    }

}