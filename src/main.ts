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
