class StaticClass{
    static printName(name){
        print(name);
    }
}

const print = (name) => console.log(name);

module.exports = StaticClass;