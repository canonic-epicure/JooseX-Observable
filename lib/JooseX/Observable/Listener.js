Class('JooseX.Observable.Listener', {
    
    has : {
        eventName   : null,
        
        func        : null,
        scope       : null,
        
        options     : null
    },
    
        
    methods : {
        
        activate : function (source, args) {
            
            this.func.apply(this.scope || source, args)
        }
    }
})


