Class('JooseX.Observable.Listener', {
    
    has : {
        
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


