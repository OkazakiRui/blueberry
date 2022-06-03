{
  type Animal = {
    age: number;
  };
  type Human = {
    age: number;
    name: string;
  };

  type AnimalFamily = {
    familyName: string;
    mother: Animal;
    father: Animal;
    child: Animal;
  };
  type HumanFamily = {
    familyName: string;
    mother: Human;
    father: Human;
    child: Human;
  };
}
{
  type User<T> = {
    name: string;
    child: T;
  };
  type Family<Parent, Child> = {
    mother: Parent;
    father: Parent;
    child: Child;
  };
  const obj: Family<number, string> = {
    mother: 12,
    father: 123,
    child: 'hoge',
  };
}
{
  type HasName = {
    name: string;
  };
  type Family<Parent extends HasName, Child extends HasName> = {
    mother: Parent;
    father: Parent;
    child: Child;
  };
  // const obj: Family<number, string> = {
  //   mother: 12,
  //   father: 123,
  //   child: 'hoge',
  // };
}
{
  type HasName = {
    name: string;
  };
  type Family<Parent extends HasName, Child extends HasName> = {
    mother: Parent;
    father: Parent;
    child: Child;
  };
  type Animal = {
    name: string;
  };
  type Human = {
    name: string;
    age: number;
  };
  type T = Family<Animal, Human>;
  const obj: T = {
    mother: {
      name: 'mother',
    },
    father: {
      name: 'father',
    },
    child: {
      name: 'child',
      age: 0,
    },
  };
}
{
  type HasName = {
    name: string;
  };
  // ジェネリクスの引数をextendsすることができる
  type Family<Parent extends HasName, Child extends Parent> = {
    mother: Parent;
    father: Parent;
    child: Child;
  };
  type Animal = {
    name: string;
  };
  type Human = {
    name: string;
    age: number;
  };
  type S = Family<Animal, Human>;
  // type T = Family<Human, Animal>;
}
{
  type Animal = {
    name: string;
  };
  type Family<Parent = Animal, Child = Animal> = {
    mother: Parent;
    father: Parent;
    child: Child;
  };
  type S = Family<string, string>;
  type T = Family;
  type U = Family<string>;
  const s: S = {
    mother: 'dgsa',
    father: 'hoe',
    child: 'adfa',
  };
  const t: T = {
    mother: {
      name: 'fuga',
    },
    father: {
      name: 'piyo',
    },
    child: {
      name: 'hoge',
    },
  };
  const u: U = {
    mother: 'hoge',
    father: 'hoge',
    child: {
      name: 'hoge',
    },
  };
}
{
  type HasName = {
    name: string;
  };
  type Animal = {
    name: string;
  };
  type Family<Parent extends HasName, Child extends HasName = Animal> = {
    mother: Parent;
    father: Parent;
    child: Child;
  };
  type Human = {
    name: string;
    age: number;
  };
  const f: Family<Human> = {
    mother: {
      name: 'mother',
      age: 12,
    },
    father: {
      name: 'father',
      age: 12,
    },
    child: {
      name: 'child',
    },
  };
  f;
}
{
  type ary1 = Array<string>;
  type ary2 = ReadonlyArray<string>;
}
{
  const ary = [1, 10, 100];
  for (const val of ary) {
    // console.log(val);
  }
}
{
  type User = [name: string, age: number];
  const rui: User = ['awea', 213];
}
{
  const nest = {
    num: 123,
    obj: {
      foo: 'hoge',
      bar: 'fuga',
    },
  };
  const {
    num,
    obj: { foo },
  } = nest;
  // console.log(num, foo);
}
{
  const obj: { num: number; foo?: number } = {
    num: 123,
  };
  const { num, foo = 300 } = obj;
}
{
  type User = {
    name: string;
    age: number;
    premiumUser: boolean;
  };
  const data = `
  uhyo,57,1
  John Smith, 18, 0
  Mary Sue, 12, 1
  `;

  const users: User[] = [];
  const lines = data.split('\n');
  for (const line of lines) {
    if (line.replace(/^ +/g, '') === '') continue;
    const [name, ageString, premiumUserString] = line
      .replace(/^ +/g, '')
      .replace(/, /g, ',')
      .split(',');
    users.push({
      name,
      age: Number(ageString),
      premiumUser: premiumUserString === '1',
    });
  }

  for (const user of users) {
    if (user.premiumUser) {
      // console.log(`${user.name} (${user.age}) はプレミアムユーザーです`);
    } else {
      // console.log(
      //   `${user.name} (${user.age}) はプレミアムユーザーではありません`
      // );
    }
  }
}
{
  function map(array: number[], callback: (value: number) => number): number[] {
    const result: number[] = [];
    for (const value of array) {
      result.push(callback(value));
    }
    return result;
  }
  // console.log(map([1, 2, 3, 4, 5, 6], (number) => number * 2));
}
{
  function map<T, U>(array: T[], callback: (value: T) => U): U[] {
    const result: U[] = [];
    for (const value of array) {
      result.push(callback(value));
    }
    return result;
  }
  // console.log(map([1, 2, 3, 4, 5, 6], (number) => number * 2 > 6));
}
{
  class User {
    name: string;
    age: number;
    constructor({ name, age }: { name: string; age: number }) {
      this.name = name;
      this.age = age;
    }
    isAdult(): boolean {
      return this.age >= 20;
    }
  }
  const okazaki = new User({ name: 'okazaki', age: 20 });
  // console.log(okazaki.name);
  // console.log(okazaki.isAdult());
}
{
  class User {
    readonly name: string;
    age: number;
    constructor({ name, age }: { name: string; age: number }) {
      // 初期化される前に呼び出しているのでエラーがでる
      // console.log(this.name);

      this.name = name;
      this.age = age;

      // 初期化済みなのでエラーは出ない
      // console.log(this.name);
    }
    isAdult(): boolean {
      return this.age >= 20;
    }
  }
  const okazaki = new User({ name: 'okazaki', age: 20 });
  // nameはreadonlyなのでエラー
  // okazaki.name = 'hoge';
}
{
  class User {
    static adminName: string = 'static okzk';
    static getAdminUser() {
      return new User({ name: User.adminName, age: 20 });
    }

    name: string;
    age: number;
    constructor({ name, age }: { name: string; age: number }) {
      this.name = name;
      this.age = age;
    }
    isAdult(): boolean {
      return this.age >= 20;
    }
  }
  const okazaki = new User({ name: 'okazaki', age: 20 });

  // 静的メンバーはクラス名でアクセスできる
  // インスタンスを作成しなくても使用することができる
  // console.log(User.adminName);
  // console.log(User.getAdminUser());
}
{
  class User {
    // 修飾詞をつけることで、コンストラクタの引数であると同時にプロパティ宣言を行う
    // publicの場合も修飾詞はつけなくてはならない
    // constructorの引数の中で初期化する構文はtsのもの
    constructor(public name: string, private age: number) {
      this.name = name;
      this.age = age;
    }
    isAdult(): boolean {
      return this.age >= 20;
    }
  }
  const okazaki = new User('okazaki', 20);
}
{
  // 宣言的にクラスを生成することもできる
  // ただし、protectedやprivateは使えない
  const User = class {
    static adminName: string = 'static okzk';
    static getAdminUser() {
      return new User({ name: User.adminName, age: 20 });
    }

    name: string;
    age: number;
    constructor({ name, age }: { name: string; age: number }) {
      this.name = name;
      this.age = age;
    }
    isAdult(): boolean {
      return this.age >= 20;
    }
  };
  const okazaki = new User({ name: 'okazaki', age: 20 });
}
{
  class User {
    name: string;
    // #でprivateにすることもできる
    #age: number;
    constructor({ name, age }: { name: string; age: number }) {
      this.name = name;
      this.#age = age;
    }
    isAdult(): boolean {
      return this.#age >= 20;
    }
  }
  const okazaki = new User({ name: 'okazaki', age: 20 });
  // console.log(okazaki.#age);
}
{
  class User {
    #age: number = 0;

    static adminUser: User;
    static {
      this.adminUser = new User();
      this.adminUser.#age = 99999;
    }

    getAge() {
      return this.#age;
    }

    setAge(value: number) {
      if (0 > value || 150 < value) return;
      this.#age = value;
    }
  }

  // console.log(User.adminUser.getAge());
}
{
  class User<T> {
    name: string;
    #age: number;
    readonly data: T;

    constructor(name: string, age: number, data: T) {
      this.name = name;
      this.#age = age;
      this.data = data;
    }

    isAdult(): boolean {
      return 20 <= this.#age;
    }
  }
  const okazaki1 = new User('okazaki', 20, true);
  const okazaki2 = new User('okazaki', 20, { mother: 'tomoko' });
  const okazaki3 = new User('okazaki', 20, 20020206);
}
