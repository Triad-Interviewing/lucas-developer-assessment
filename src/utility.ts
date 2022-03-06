// Checks if unknown object is of instance Koa.Context
// via identifiable attribute(s).
function isCtx(obj: unknown): boolean{
    if(obj instanceof Object){
        const e_as_object: Object = obj as Object;
        if(e_as_object.hasOwnProperty('status')) {
            return true;
        } else{
            return false;
        }
    }

    return false;
}

export { isCtx };