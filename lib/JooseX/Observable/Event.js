Class('JooseX.Observable.Event', {
    
    has : {
        source      : { required : true },
        current     : { required : true },
        
        name        : { required : true },
        splat       : { required : true },
        
        args        : { required : true },
        
        bubbling    : true
    },
    
        
    methods : {
        
        stopPropagation : function () {
            this.bubbling = false
        }
    }
})


