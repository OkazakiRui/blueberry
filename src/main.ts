import { constructor } from 'console';

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
{
  class User {
    name: string = 'okzk';
    age: number = 200;

    isAdult(): boolean {
      return 20 <= this.age;
    }
  }
  const okazaki: User = new User();
  // typescriptが構造的部分型付け言語なので、エラーが起きていない
  const hoge: User = {
    name: 'hoge',
    age: 20,
    isAdult: () => true,
  };
}
{
  // typeと変数宣言では
  // 名前空間が異なるためエラーが起きない
  type item = {
    name: string;
    age: number;
  };
  const item: item = {
    name: 'okzk',
    age: 20,
  };

  // classの場合は型と変数名どちらの名前空間も使用する
  class User {
    name: string = 'okzk';
    age: number = 20;
  }
  // どちらの名前空間も使用しているため、エラーが出る
  // const User: User = new User();
}
{
  class User {
    name: string = 'okzk';
    age: number = 20;
  }
  // newで初期化するとUserオブジェクトを返却するのでエラーが起きない
  type MyUserConstructor = new () => User;
  const MyUser: MyUserConstructor = User;
  const u = new MyUser();
  // console.log(u.name, u.age);
}
{
  class User {
    name: string;
    #age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.#age = age;
    }
    public isAdult(): boolean {
      return 20 <= this.#age;
    }
  }

  class PremiumUser extends User {
    rank: number = 1;
    public override isAdult(): boolean {
      return true;
    }
  }
}
{
  type HasName = { name: string };
  // 共通型がある場合はimplementsで型をつけることができる
  class User implements HasName {
    name: string;
    #age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.#age = age;
    }
    public isAdult(): boolean {
      return this.#age >= 20;
    }
  }
}
{
  const throwError = () => {
    throw new Error('エラーが発生しました');
  };
  // throwError();
}
{
  const throwError = () => {
    throw new Error('エラーが発生しました');
  };

  try {
    // errorオブジェクトをcatchに投げる
    // throwError();
    // errorオブジェクトを受け取る
  } catch (error) {
    console.log('catch');
    console.log(error);
  } finally {
    // console.log('終わり');
  }
}
{
  class User {
    constructor(readonly name: string, readonly age: number) {
      if (name === '') throw new Error('nameを入力してください');
      this.name = name;
      this.age = age;
    }
    getMessage(message: string): string {
      return `${this.name}(${this.age}) : ${message}`;
    }
  }
  const okzk = new User('okazaki', 20);
  // console.log(okzk.getMessage('hello world'));
}
{
  class User {
    readonly #name: string;
    readonly #age: number;

    constructor(name: string, age: number) {
      if (name === '') throw new Error('nameを入力してください');
      this.#name = name;
      this.#age = age;
    }
    getMessage(message: string): string {
      return `${this.#name}(${this.#age}) : ${message}`;
    }
  }
  const okzk = new User('okazaki', 20);
  // console.log(okzk.getMessage('hello world'));
}
{
  type Animal = {
    species: string;
  };
  type Human = {
    name: string;
  };
  type User = Animal | Human;
  const tama: User = {
    species: 'Felis silvestris catus',
  };
  const okzk: User = {
    name: 'okazaki',
  };
}
{
  type Animal = {
    species: string;
    age: number;
  };
  type Human = Animal & {
    name: string;
  };
  const tama: Animal = {
    species: 'Felis silvestris catus',
    age: 12,
  };
  const okzk: Human = {
    species: 'Homo sapiens sapiens',
    age: 20,
    name: 'okazaki',
  };
}
{
  type StringAndNumber = string & number;
}
{
  // string を継承することでジェネリクスの T は文字列型になる
  function makeKey<T extends string>(userName: T) {
    // as const で型にすることで、返り値に型を指定することができる
    return `user:${userName}` as const;
  }

  const okzk = makeKey('okazaki');
}
{
  // 引数の型が user:<T> というテンプレートリテラル型になる
  function fromKey<T extends string>(key: `user:${T}`): T {
    return key.slice(5) as T;
  }
  const okzk = fromKey('user:okazaki');
}
{
  type Human = {
    type: 'human';
    name: string;
    age: number;
  };
  // 型情報の中の型情報を引っ張ってくることを
  // lockup型という
  function setAge(human: Human, age: Human['age']) {
    return {
      ...human,
      age,
    };
  }
  const okzk: Human = {
    type: 'human',
    name: 'okazaki',
    age: 20,
  };
  const newOkzk = setAge(okzk, 30);
}
{
  type Human = {
    name: string;
    age: number;
  };
  // Humanのkey名を文字リテラル型として取得する
  type HumanKeys = keyof Human;
  let key: HumanKeys = 'name';
  key = 'age';
  // 対象の文字リテラル型でないためエラーが出る
  // key = 'okazaki';
}
{
  // ミリメートルをメートルやキロメートルに変換するための指数を格納
  const mmConversionTable = {
    mm: 1,
    cm: 10,
    m: 1e3,
    km: 1e6,
  };

  type keyMM = keyof typeof mmConversionTable;

  const convertUnits = (
    // 変換したい数字を指定
    value: number,
    // 変換したい単位を指定
    unit: keyof typeof mmConversionTable
  ) => {
    const mmValue = value * mmConversionTable[unit];
    return {
      mm: mmValue,
      cm: mmValue / 10,
      m: mmValue / 1e3,
      km: mmValue / 1e6,
    };
  };
  // console.log(convertUnits(5600, 'm'));
  // console.log(convertUnits(5600, 'cm'));
}
{
  const get = <T, K extends keyof T>(obj: T, key: K): T[K] => {
    return obj[key];
  };
  type Human = {
    name: string;
    age: number;
  };
  const okzk: Human = {
    name: 'okazaki',
    age: 20,
  };
  const okzkName = get(okzk, 'name');
  const okzkAge = get(okzk, 'age');
}
