
const defaultSate = {
    project : {}
}

export default function reducer(
    state = defaultSate,
    {type , payload} : {type : string; payload : any }
) : any {
    switch(type){
        case 'SET_COMPANY' :
            return {
                ...state,
                companys  : payload
            }
    }
}