# faiqu
> fetch for restful api

### Install
`npm i faiqu --save`

### Simple example
`import faiqu from 'faiqu'`

`faiqu('/api').params({id:1}).get().then(res=>{
    console.log(res)
})`
### APIs
#### Init Api 
1. __faiquInit.baseUrl__(url:string)
>If the parameters you passed in the faiqu method are ' http://xxxx ', the method does not take effect

2. __faiquInit.preMethod__(Array< Function >)
3. __faiquInit.defaultData__(data:{}) 
> key:string=>value:Function

4. __faiquInit.defaultHeader__(data:{}) 
> default:{ 'Content-type': 'application/x-www-form-urlencoded' }

5. __faiquInit.defaultParams__(data:{})
> default:{credentials: 'include' }

6. __faiquInit.err_catch__(param:Function)
> This method only applies to the error in the faiqu object and the error in preMethod 

#### First Level
1. __faiqu__ (url:string)

Initialize a faiqu object as the request url
#### Second Level
1. __params__(data:{})
2. __json__ ()
>set requeset header  'Content-type'=>'application/json'

3. __headers__(data:{})

#### Third Level
1. __get__()
2. __post__ ()
3. __put__ (id?:string)
4. __delete__(id?:string)
