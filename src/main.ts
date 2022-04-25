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
    const replacedData = line
      .replace(/^ +/g, '')
      .replace(/, /g, ',')
      .split(',');
    users.push({
      name: replacedData[0],
      age: Number(replacedData[1]),
      premiumUser: replacedData[2] === '1' ? true : false,
    });
  }

  for (const user of users) {
    if (user.premiumUser)
      console.log(`${user.name} (${user.age}) はプレミアムユーザーです`);
    else
      console.log(
        `${user.name} (${user.age}) はプレミアムユーザーではありません`
      );
  }
}
