Class('JooseX.Observable.Listener', {
    
    has : {
        eventName   : null,
        
        func        : null,
        scope       : null,
        
        options     : Joose.I.Object
    },
    
        
    methods : {
        
        activate : function (source, args) {
            
            this.func.apply(this.scope || source, args)
            
            if (this.options.single) source.un(this)
        }
    }
})


