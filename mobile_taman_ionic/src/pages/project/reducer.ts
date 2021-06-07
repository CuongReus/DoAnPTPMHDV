
const defaultSate = {
    project : {}
}

export default function reducer(
    state = defaultSate,
    {type , payload} : {type : string; payload : any }
) : any {
    switch(type){
        case 'SET_PROJECT' :
            return {
                ...state,
                projects  : payload
            }
    }
}