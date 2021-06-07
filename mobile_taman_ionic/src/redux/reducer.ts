
export default function reducer(
    state = {},
    {type , payload} : {type : string; payload : any }
) : any {
    switch(type){
        case 'SET_CURRENT_USER_STATE' :
            return {
                ...state,
                currentUserStore  : payload
            }
    }
    return state;
}