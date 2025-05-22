/**
 * Client
 **/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Recipes
 *
 */
export type Recipes = $Result.DefaultSelection<Prisma.$RecipesPayload>;
/**
 * Model Ingredients
 *
 */
export type Ingredients = $Result.DefaultSelection<Prisma.$IngredientsPayload>;
/**
 * Model Instructions
 *
 */
export type Instructions =
  $Result.DefaultSelection<Prisma.$InstructionsPayload>;
/**
 * Model FoodAllergies
 *
 */
export type FoodAllergies =
  $Result.DefaultSelection<Prisma.$FoodAllergiesPayload>;
/**
 * Model RecipeFoodAllergies
 *
 */
export type RecipeFoodAllergies =
  $Result.DefaultSelection<Prisma.$RecipeFoodAllergiesPayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Recipes
 * const recipes = await prisma.recipes.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Recipes
   * const recipes = await prisma.recipes.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.recipes`: Exposes CRUD operations for the **Recipes** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Recipes
   * const recipes = await prisma.recipes.findMany()
   * ```
   */
  get recipes(): Prisma.RecipesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ingredients`: Exposes CRUD operations for the **Ingredients** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Ingredients
   * const ingredients = await prisma.ingredients.findMany()
   * ```
   */
  get ingredients(): Prisma.IngredientsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.instructions`: Exposes CRUD operations for the **Instructions** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Instructions
   * const instructions = await prisma.instructions.findMany()
   * ```
   */
  get instructions(): Prisma.InstructionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.foodAllergies`: Exposes CRUD operations for the **FoodAllergies** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more FoodAllergies
   * const foodAllergies = await prisma.foodAllergies.findMany()
   * ```
   */
  get foodAllergies(): Prisma.FoodAllergiesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipeFoodAllergies`: Exposes CRUD operations for the **RecipeFoodAllergies** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more RecipeFoodAllergies
   * const recipeFoodAllergies = await prisma.recipeFoodAllergies.findMany()
   * ```
   */
  get recipeFoodAllergies(): Prisma.RecipeFoodAllergiesDelegate<
    ExtArgs,
    ClientOptions
  >;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    Recipes: 'Recipes';
    Ingredients: 'Ingredients';
    Instructions: 'Instructions';
    FoodAllergies: 'FoodAllergies';
    RecipeFoodAllergies: 'RecipeFoodAllergies';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb<ClientOptions = {}>
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | 'recipes'
        | 'ingredients'
        | 'instructions'
        | 'foodAllergies'
        | 'recipeFoodAllergies';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Recipes: {
        payload: Prisma.$RecipesPayload<ExtArgs>;
        fields: Prisma.RecipesFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RecipesFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RecipesFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>;
          };
          findFirst: {
            args: Prisma.RecipesFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RecipesFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>;
          };
          findMany: {
            args: Prisma.RecipesFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>[];
          };
          create: {
            args: Prisma.RecipesCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>;
          };
          createMany: {
            args: Prisma.RecipesCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RecipesCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>[];
          };
          delete: {
            args: Prisma.RecipesDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>;
          };
          update: {
            args: Prisma.RecipesUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>;
          };
          deleteMany: {
            args: Prisma.RecipesDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RecipesUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.RecipesUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>[];
          };
          upsert: {
            args: Prisma.RecipesUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipesPayload>;
          };
          aggregate: {
            args: Prisma.RecipesAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRecipes>;
          };
          groupBy: {
            args: Prisma.RecipesGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RecipesGroupByOutputType>[];
          };
          count: {
            args: Prisma.RecipesCountArgs<ExtArgs>;
            result: $Utils.Optional<RecipesCountAggregateOutputType> | number;
          };
        };
      };
      Ingredients: {
        payload: Prisma.$IngredientsPayload<ExtArgs>;
        fields: Prisma.IngredientsFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.IngredientsFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.IngredientsFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>;
          };
          findFirst: {
            args: Prisma.IngredientsFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.IngredientsFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>;
          };
          findMany: {
            args: Prisma.IngredientsFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>[];
          };
          create: {
            args: Prisma.IngredientsCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>;
          };
          createMany: {
            args: Prisma.IngredientsCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.IngredientsCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>[];
          };
          delete: {
            args: Prisma.IngredientsDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>;
          };
          update: {
            args: Prisma.IngredientsUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>;
          };
          deleteMany: {
            args: Prisma.IngredientsDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.IngredientsUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.IngredientsUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>[];
          };
          upsert: {
            args: Prisma.IngredientsUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$IngredientsPayload>;
          };
          aggregate: {
            args: Prisma.IngredientsAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateIngredients>;
          };
          groupBy: {
            args: Prisma.IngredientsGroupByArgs<ExtArgs>;
            result: $Utils.Optional<IngredientsGroupByOutputType>[];
          };
          count: {
            args: Prisma.IngredientsCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<IngredientsCountAggregateOutputType>
              | number;
          };
        };
      };
      Instructions: {
        payload: Prisma.$InstructionsPayload<ExtArgs>;
        fields: Prisma.InstructionsFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.InstructionsFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InstructionsPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.InstructionsFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InstructionsPayload>;
          };
          findFirst: {
            args: Prisma.InstructionsFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InstructionsPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.InstructionsFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InstructionsPayload>;
          };
          findMany: {
            args: Prisma.InstructionsFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InstructionsPayload>[];
          };
          create: {
            args: Prisma.InstructionsCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InstructionsPayload>;
          };
          createMany: {
            args: Prisma.InstructionsCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.InstructionsCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InstructionsPayload>[];
          };
          delete: {
            args: Prisma.InstructionsDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InstructionsPayload>;
          };
          update: {
            args: Prisma.InstructionsUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InstructionsPayload>;
          };
          deleteMany: {
            args: Prisma.InstructionsDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.InstructionsUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.InstructionsUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InstructionsPayload>[];
          };
          upsert: {
            args: Prisma.InstructionsUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$InstructionsPayload>;
          };
          aggregate: {
            args: Prisma.InstructionsAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateInstructions>;
          };
          groupBy: {
            args: Prisma.InstructionsGroupByArgs<ExtArgs>;
            result: $Utils.Optional<InstructionsGroupByOutputType>[];
          };
          count: {
            args: Prisma.InstructionsCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<InstructionsCountAggregateOutputType>
              | number;
          };
        };
      };
      FoodAllergies: {
        payload: Prisma.$FoodAllergiesPayload<ExtArgs>;
        fields: Prisma.FoodAllergiesFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.FoodAllergiesFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FoodAllergiesPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.FoodAllergiesFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FoodAllergiesPayload>;
          };
          findFirst: {
            args: Prisma.FoodAllergiesFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FoodAllergiesPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.FoodAllergiesFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FoodAllergiesPayload>;
          };
          findMany: {
            args: Prisma.FoodAllergiesFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FoodAllergiesPayload>[];
          };
          create: {
            args: Prisma.FoodAllergiesCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FoodAllergiesPayload>;
          };
          createMany: {
            args: Prisma.FoodAllergiesCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.FoodAllergiesCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FoodAllergiesPayload>[];
          };
          delete: {
            args: Prisma.FoodAllergiesDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FoodAllergiesPayload>;
          };
          update: {
            args: Prisma.FoodAllergiesUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FoodAllergiesPayload>;
          };
          deleteMany: {
            args: Prisma.FoodAllergiesDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.FoodAllergiesUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.FoodAllergiesUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FoodAllergiesPayload>[];
          };
          upsert: {
            args: Prisma.FoodAllergiesUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FoodAllergiesPayload>;
          };
          aggregate: {
            args: Prisma.FoodAllergiesAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateFoodAllergies>;
          };
          groupBy: {
            args: Prisma.FoodAllergiesGroupByArgs<ExtArgs>;
            result: $Utils.Optional<FoodAllergiesGroupByOutputType>[];
          };
          count: {
            args: Prisma.FoodAllergiesCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<FoodAllergiesCountAggregateOutputType>
              | number;
          };
        };
      };
      RecipeFoodAllergies: {
        payload: Prisma.$RecipeFoodAllergiesPayload<ExtArgs>;
        fields: Prisma.RecipeFoodAllergiesFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RecipeFoodAllergiesFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipeFoodAllergiesPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RecipeFoodAllergiesFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipeFoodAllergiesPayload>;
          };
          findFirst: {
            args: Prisma.RecipeFoodAllergiesFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipeFoodAllergiesPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RecipeFoodAllergiesFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipeFoodAllergiesPayload>;
          };
          findMany: {
            args: Prisma.RecipeFoodAllergiesFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipeFoodAllergiesPayload>[];
          };
          create: {
            args: Prisma.RecipeFoodAllergiesCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipeFoodAllergiesPayload>;
          };
          createMany: {
            args: Prisma.RecipeFoodAllergiesCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RecipeFoodAllergiesCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipeFoodAllergiesPayload>[];
          };
          delete: {
            args: Prisma.RecipeFoodAllergiesDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipeFoodAllergiesPayload>;
          };
          update: {
            args: Prisma.RecipeFoodAllergiesUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipeFoodAllergiesPayload>;
          };
          deleteMany: {
            args: Prisma.RecipeFoodAllergiesDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RecipeFoodAllergiesUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.RecipeFoodAllergiesUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipeFoodAllergiesPayload>[];
          };
          upsert: {
            args: Prisma.RecipeFoodAllergiesUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RecipeFoodAllergiesPayload>;
          };
          aggregate: {
            args: Prisma.RecipeFoodAllergiesAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRecipeFoodAllergies>;
          };
          groupBy: {
            args: Prisma.RecipeFoodAllergiesGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RecipeFoodAllergiesGroupByOutputType>[];
          };
          count: {
            args: Prisma.RecipeFoodAllergiesCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<RecipeFoodAllergiesCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    recipes?: RecipesOmit;
    ingredients?: IngredientsOmit;
    instructions?: InstructionsOmit;
    foodAllergies?: FoodAllergiesOmit;
    recipeFoodAllergies?: RecipeFoodAllergiesOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T['emit'] extends 'event'
        ? T['level']
        : never
      : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ?
          | GetLogType<T[0]>
          | GetLogType<T[1]>
          | GetLogType<T[2]>
          | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type RecipesCountOutputType
   */

  export type RecipesCountOutputType = {
    ingredients: number;
    instructions: number;
    recipe_food_allergies: number;
  };

  export type RecipesCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    ingredients?: boolean | RecipesCountOutputTypeCountIngredientsArgs;
    instructions?: boolean | RecipesCountOutputTypeCountInstructionsArgs;
    recipe_food_allergies?:
      | boolean
      | RecipesCountOutputTypeCountRecipe_food_allergiesArgs;
  };

  // Custom InputTypes
  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipesCountOutputType
     */
    select?: RecipesCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeCountIngredientsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: IngredientsWhereInput;
  };

  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeCountInstructionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: InstructionsWhereInput;
  };

  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeCountRecipe_food_allergiesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RecipeFoodAllergiesWhereInput;
  };

  /**
   * Count Type FoodAllergiesCountOutputType
   */

  export type FoodAllergiesCountOutputType = {
    recipe_food_allergies: number;
  };

  export type FoodAllergiesCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    recipe_food_allergies?:
      | boolean
      | FoodAllergiesCountOutputTypeCountRecipe_food_allergiesArgs;
  };

  // Custom InputTypes
  /**
   * FoodAllergiesCountOutputType without action
   */
  export type FoodAllergiesCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergiesCountOutputType
     */
    select?: FoodAllergiesCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * FoodAllergiesCountOutputType without action
   */
  export type FoodAllergiesCountOutputTypeCountRecipe_food_allergiesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RecipeFoodAllergiesWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Recipes
   */

  export type AggregateRecipes = {
    _count: RecipesCountAggregateOutputType | null;
    _avg: RecipesAvgAggregateOutputType | null;
    _sum: RecipesSumAggregateOutputType | null;
    _min: RecipesMinAggregateOutputType | null;
    _max: RecipesMaxAggregateOutputType | null;
  };

  export type RecipesAvgAggregateOutputType = {
    id: number | null;
    cooking_temperature: number | null;
  };

  export type RecipesSumAggregateOutputType = {
    id: number | null;
    cooking_temperature: number | null;
  };

  export type RecipesMinAggregateOutputType = {
    id: number | null;
    title: string | null;
    cooking_time: string | null;
    cooking_temperature: number | null;
    servings: string | null;
    mold_type: string | null;
    mold_size: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type RecipesMaxAggregateOutputType = {
    id: number | null;
    title: string | null;
    cooking_time: string | null;
    cooking_temperature: number | null;
    servings: string | null;
    mold_type: string | null;
    mold_size: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type RecipesCountAggregateOutputType = {
    id: number;
    title: number;
    cooking_time: number;
    cooking_temperature: number;
    servings: number;
    mold_type: number;
    mold_size: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
  };

  export type RecipesAvgAggregateInputType = {
    id?: true;
    cooking_temperature?: true;
  };

  export type RecipesSumAggregateInputType = {
    id?: true;
    cooking_temperature?: true;
  };

  export type RecipesMinAggregateInputType = {
    id?: true;
    title?: true;
    cooking_time?: true;
    cooking_temperature?: true;
    servings?: true;
    mold_type?: true;
    mold_size?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type RecipesMaxAggregateInputType = {
    id?: true;
    title?: true;
    cooking_time?: true;
    cooking_temperature?: true;
    servings?: true;
    mold_type?: true;
    mold_size?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type RecipesCountAggregateInputType = {
    id?: true;
    title?: true;
    cooking_time?: true;
    cooking_temperature?: true;
    servings?: true;
    mold_type?: true;
    mold_size?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
  };

  export type RecipesAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Recipes to aggregate.
     */
    where?: RecipesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Recipes to fetch.
     */
    orderBy?:
      | RecipesOrderByWithRelationInput
      | RecipesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RecipesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Recipes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Recipes
     **/
    _count?: true | RecipesCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: RecipesAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: RecipesSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RecipesMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RecipesMaxAggregateInputType;
  };

  export type GetRecipesAggregateType<T extends RecipesAggregateArgs> = {
    [P in keyof T & keyof AggregateRecipes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipes[P]>
      : GetScalarType<T[P], AggregateRecipes[P]>;
  };

  export type RecipesGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RecipesWhereInput;
    orderBy?:
      | RecipesOrderByWithAggregationInput
      | RecipesOrderByWithAggregationInput[];
    by: RecipesScalarFieldEnum[] | RecipesScalarFieldEnum;
    having?: RecipesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecipesCountAggregateInputType | true;
    _avg?: RecipesAvgAggregateInputType;
    _sum?: RecipesSumAggregateInputType;
    _min?: RecipesMinAggregateInputType;
    _max?: RecipesMaxAggregateInputType;
  };

  export type RecipesGroupByOutputType = {
    id: number;
    title: string;
    cooking_time: string | null;
    cooking_temperature: number | null;
    servings: string | null;
    mold_type: string | null;
    mold_size: string | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    _count: RecipesCountAggregateOutputType | null;
    _avg: RecipesAvgAggregateOutputType | null;
    _sum: RecipesSumAggregateOutputType | null;
    _min: RecipesMinAggregateOutputType | null;
    _max: RecipesMaxAggregateOutputType | null;
  };

  type GetRecipesGroupByPayload<T extends RecipesGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<RecipesGroupByOutputType, T['by']> & {
          [P in keyof T & keyof RecipesGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipesGroupByOutputType[P]>
            : GetScalarType<T[P], RecipesGroupByOutputType[P]>;
        }
      >
    >;

  export type RecipesSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      cooking_time?: boolean;
      cooking_temperature?: boolean;
      servings?: boolean;
      mold_type?: boolean;
      mold_size?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      ingredients?: boolean | Recipes$ingredientsArgs<ExtArgs>;
      instructions?: boolean | Recipes$instructionsArgs<ExtArgs>;
      recipe_food_allergies?:
        | boolean
        | Recipes$recipe_food_allergiesArgs<ExtArgs>;
      _count?: boolean | RecipesCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['recipes']
  >;

  export type RecipesSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      cooking_time?: boolean;
      cooking_temperature?: boolean;
      servings?: boolean;
      mold_type?: boolean;
      mold_size?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
    },
    ExtArgs['result']['recipes']
  >;

  export type RecipesSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      cooking_time?: boolean;
      cooking_temperature?: boolean;
      servings?: boolean;
      mold_type?: boolean;
      mold_size?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
    },
    ExtArgs['result']['recipes']
  >;

  export type RecipesSelectScalar = {
    id?: boolean;
    title?: boolean;
    cooking_time?: boolean;
    cooking_temperature?: boolean;
    servings?: boolean;
    mold_type?: boolean;
    mold_size?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
  };

  export type RecipesOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'title'
    | 'cooking_time'
    | 'cooking_temperature'
    | 'servings'
    | 'mold_type'
    | 'mold_size'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at',
    ExtArgs['result']['recipes']
  >;
  export type RecipesInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    ingredients?: boolean | Recipes$ingredientsArgs<ExtArgs>;
    instructions?: boolean | Recipes$instructionsArgs<ExtArgs>;
    recipe_food_allergies?:
      | boolean
      | Recipes$recipe_food_allergiesArgs<ExtArgs>;
    _count?: boolean | RecipesCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type RecipesIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type RecipesIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $RecipesPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Recipes';
    objects: {
      ingredients: Prisma.$IngredientsPayload<ExtArgs>[];
      instructions: Prisma.$InstructionsPayload<ExtArgs>[];
      recipe_food_allergies: Prisma.$RecipeFoodAllergiesPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        title: string;
        cooking_time: string | null;
        cooking_temperature: number | null;
        servings: string | null;
        mold_type: string | null;
        mold_size: string | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
      },
      ExtArgs['result']['recipes']
    >;
    composites: {};
  };

  type RecipesGetPayload<
    S extends boolean | null | undefined | RecipesDefaultArgs,
  > = $Result.GetResult<Prisma.$RecipesPayload, S>;

  type RecipesCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<RecipesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RecipesCountAggregateInputType | true;
  };

  export interface RecipesDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Recipes'];
      meta: { name: 'Recipes' };
    };
    /**
     * Find zero or one Recipes that matches the filter.
     * @param {RecipesFindUniqueArgs} args - Arguments to find a Recipes
     * @example
     * // Get one Recipes
     * const recipes = await prisma.recipes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipesFindUniqueArgs>(
      args: SelectSubset<T, RecipesFindUniqueArgs<ExtArgs>>,
    ): Prisma__RecipesClient<
      $Result.GetResult<
        Prisma.$RecipesPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Recipes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipesFindUniqueOrThrowArgs} args - Arguments to find a Recipes
     * @example
     * // Get one Recipes
     * const recipes = await prisma.recipes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipesFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RecipesFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__RecipesClient<
      $Result.GetResult<
        Prisma.$RecipesPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Recipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesFindFirstArgs} args - Arguments to find a Recipes
     * @example
     * // Get one Recipes
     * const recipes = await prisma.recipes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipesFindFirstArgs>(
      args?: SelectSubset<T, RecipesFindFirstArgs<ExtArgs>>,
    ): Prisma__RecipesClient<
      $Result.GetResult<
        Prisma.$RecipesPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Recipes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesFindFirstOrThrowArgs} args - Arguments to find a Recipes
     * @example
     * // Get one Recipes
     * const recipes = await prisma.recipes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RecipesFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__RecipesClient<
      $Result.GetResult<
        Prisma.$RecipesPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Recipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recipes
     * const recipes = await prisma.recipes.findMany()
     *
     * // Get first 10 Recipes
     * const recipes = await prisma.recipes.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const recipesWithIdOnly = await prisma.recipes.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RecipesFindManyArgs>(
      args?: SelectSubset<T, RecipesFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RecipesPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Recipes.
     * @param {RecipesCreateArgs} args - Arguments to create a Recipes.
     * @example
     * // Create one Recipes
     * const Recipes = await prisma.recipes.create({
     *   data: {
     *     // ... data to create a Recipes
     *   }
     * })
     *
     */
    create<T extends RecipesCreateArgs>(
      args: SelectSubset<T, RecipesCreateArgs<ExtArgs>>,
    ): Prisma__RecipesClient<
      $Result.GetResult<
        Prisma.$RecipesPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Recipes.
     * @param {RecipesCreateManyArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipes = await prisma.recipes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RecipesCreateManyArgs>(
      args?: SelectSubset<T, RecipesCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Recipes and returns the data saved in the database.
     * @param {RecipesCreateManyAndReturnArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipes = await prisma.recipes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Recipes and only return the `id`
     * const recipesWithIdOnly = await prisma.recipes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RecipesCreateManyAndReturnArgs>(
      args?: SelectSubset<T, RecipesCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RecipesPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Recipes.
     * @param {RecipesDeleteArgs} args - Arguments to delete one Recipes.
     * @example
     * // Delete one Recipes
     * const Recipes = await prisma.recipes.delete({
     *   where: {
     *     // ... filter to delete one Recipes
     *   }
     * })
     *
     */
    delete<T extends RecipesDeleteArgs>(
      args: SelectSubset<T, RecipesDeleteArgs<ExtArgs>>,
    ): Prisma__RecipesClient<
      $Result.GetResult<
        Prisma.$RecipesPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Recipes.
     * @param {RecipesUpdateArgs} args - Arguments to update one Recipes.
     * @example
     * // Update one Recipes
     * const recipes = await prisma.recipes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RecipesUpdateArgs>(
      args: SelectSubset<T, RecipesUpdateArgs<ExtArgs>>,
    ): Prisma__RecipesClient<
      $Result.GetResult<
        Prisma.$RecipesPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Recipes.
     * @param {RecipesDeleteManyArgs} args - Arguments to filter Recipes to delete.
     * @example
     * // Delete a few Recipes
     * const { count } = await prisma.recipes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RecipesDeleteManyArgs>(
      args?: SelectSubset<T, RecipesDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recipes
     * const recipes = await prisma.recipes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RecipesUpdateManyArgs>(
      args: SelectSubset<T, RecipesUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Recipes and returns the data updated in the database.
     * @param {RecipesUpdateManyAndReturnArgs} args - Arguments to update many Recipes.
     * @example
     * // Update many Recipes
     * const recipes = await prisma.recipes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Recipes and only return the `id`
     * const recipesWithIdOnly = await prisma.recipes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends RecipesUpdateManyAndReturnArgs>(
      args: SelectSubset<T, RecipesUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RecipesPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Recipes.
     * @param {RecipesUpsertArgs} args - Arguments to update or create a Recipes.
     * @example
     * // Update or create a Recipes
     * const recipes = await prisma.recipes.upsert({
     *   create: {
     *     // ... data to create a Recipes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recipes we want to update
     *   }
     * })
     */
    upsert<T extends RecipesUpsertArgs>(
      args: SelectSubset<T, RecipesUpsertArgs<ExtArgs>>,
    ): Prisma__RecipesClient<
      $Result.GetResult<
        Prisma.$RecipesPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesCountArgs} args - Arguments to filter Recipes to count.
     * @example
     * // Count the number of Recipes
     * const count = await prisma.recipes.count({
     *   where: {
     *     // ... the filter for the Recipes we want to count
     *   }
     * })
     **/
    count<T extends RecipesCountArgs>(
      args?: Subset<T, RecipesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipesCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends RecipesAggregateArgs>(
      args: Subset<T, RecipesAggregateArgs>,
    ): Prisma.PrismaPromise<GetRecipesAggregateType<T>>;

    /**
     * Group by Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends RecipesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipesGroupByArgs['orderBy'] }
        : { orderBy?: RecipesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, RecipesGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetRecipesGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Recipes model
     */
    readonly fields: RecipesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recipes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipesClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    ingredients<T extends Recipes$ingredientsArgs<ExtArgs> = {}>(
      args?: Subset<T, Recipes$ingredientsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$IngredientsPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    instructions<T extends Recipes$instructionsArgs<ExtArgs> = {}>(
      args?: Subset<T, Recipes$instructionsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$InstructionsPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    recipe_food_allergies<
      T extends Recipes$recipe_food_allergiesArgs<ExtArgs> = {},
    >(
      args?: Subset<T, Recipes$recipe_food_allergiesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Recipes model
   */
  interface RecipesFieldRefs {
    readonly id: FieldRef<'Recipes', 'Int'>;
    readonly title: FieldRef<'Recipes', 'String'>;
    readonly cooking_time: FieldRef<'Recipes', 'String'>;
    readonly cooking_temperature: FieldRef<'Recipes', 'Int'>;
    readonly servings: FieldRef<'Recipes', 'String'>;
    readonly mold_type: FieldRef<'Recipes', 'String'>;
    readonly mold_size: FieldRef<'Recipes', 'String'>;
    readonly created_at: FieldRef<'Recipes', 'DateTime'>;
    readonly updated_at: FieldRef<'Recipes', 'DateTime'>;
    readonly deleted_at: FieldRef<'Recipes', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Recipes findUnique
   */
  export type RecipesFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Recipes
     */
    omit?: RecipesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipesInclude<ExtArgs> | null;
    /**
     * Filter, which Recipes to fetch.
     */
    where: RecipesWhereUniqueInput;
  };

  /**
   * Recipes findUniqueOrThrow
   */
  export type RecipesFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Recipes
     */
    omit?: RecipesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipesInclude<ExtArgs> | null;
    /**
     * Filter, which Recipes to fetch.
     */
    where: RecipesWhereUniqueInput;
  };

  /**
   * Recipes findFirst
   */
  export type RecipesFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Recipes
     */
    omit?: RecipesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipesInclude<ExtArgs> | null;
    /**
     * Filter, which Recipes to fetch.
     */
    where?: RecipesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Recipes to fetch.
     */
    orderBy?:
      | RecipesOrderByWithRelationInput
      | RecipesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Recipes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipesScalarFieldEnum | RecipesScalarFieldEnum[];
  };

  /**
   * Recipes findFirstOrThrow
   */
  export type RecipesFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Recipes
     */
    omit?: RecipesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipesInclude<ExtArgs> | null;
    /**
     * Filter, which Recipes to fetch.
     */
    where?: RecipesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Recipes to fetch.
     */
    orderBy?:
      | RecipesOrderByWithRelationInput
      | RecipesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Recipes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipesScalarFieldEnum | RecipesScalarFieldEnum[];
  };

  /**
   * Recipes findMany
   */
  export type RecipesFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Recipes
     */
    omit?: RecipesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipesInclude<ExtArgs> | null;
    /**
     * Filter, which Recipes to fetch.
     */
    where?: RecipesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Recipes to fetch.
     */
    orderBy?:
      | RecipesOrderByWithRelationInput
      | RecipesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Recipes.
     */
    cursor?: RecipesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Recipes.
     */
    skip?: number;
    distinct?: RecipesScalarFieldEnum | RecipesScalarFieldEnum[];
  };

  /**
   * Recipes create
   */
  export type RecipesCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Recipes
     */
    omit?: RecipesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipesInclude<ExtArgs> | null;
    /**
     * The data needed to create a Recipes.
     */
    data: XOR<RecipesCreateInput, RecipesUncheckedCreateInput>;
  };

  /**
   * Recipes createMany
   */
  export type RecipesCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Recipes.
     */
    data: RecipesCreateManyInput | RecipesCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Recipes createManyAndReturn
   */
  export type RecipesCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Recipes
     */
    omit?: RecipesOmit<ExtArgs> | null;
    /**
     * The data used to create many Recipes.
     */
    data: RecipesCreateManyInput | RecipesCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Recipes update
   */
  export type RecipesUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Recipes
     */
    omit?: RecipesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipesInclude<ExtArgs> | null;
    /**
     * The data needed to update a Recipes.
     */
    data: XOR<RecipesUpdateInput, RecipesUncheckedUpdateInput>;
    /**
     * Choose, which Recipes to update.
     */
    where: RecipesWhereUniqueInput;
  };

  /**
   * Recipes updateMany
   */
  export type RecipesUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipesUpdateManyMutationInput, RecipesUncheckedUpdateManyInput>;
    /**
     * Filter which Recipes to update
     */
    where?: RecipesWhereInput;
    /**
     * Limit how many Recipes to update.
     */
    limit?: number;
  };

  /**
   * Recipes updateManyAndReturn
   */
  export type RecipesUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Recipes
     */
    omit?: RecipesOmit<ExtArgs> | null;
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipesUpdateManyMutationInput, RecipesUncheckedUpdateManyInput>;
    /**
     * Filter which Recipes to update
     */
    where?: RecipesWhereInput;
    /**
     * Limit how many Recipes to update.
     */
    limit?: number;
  };

  /**
   * Recipes upsert
   */
  export type RecipesUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Recipes
     */
    omit?: RecipesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipesInclude<ExtArgs> | null;
    /**
     * The filter to search for the Recipes to update in case it exists.
     */
    where: RecipesWhereUniqueInput;
    /**
     * In case the Recipes found by the `where` argument doesn't exist, create a new Recipes with this data.
     */
    create: XOR<RecipesCreateInput, RecipesUncheckedCreateInput>;
    /**
     * In case the Recipes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipesUpdateInput, RecipesUncheckedUpdateInput>;
  };

  /**
   * Recipes delete
   */
  export type RecipesDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Recipes
     */
    omit?: RecipesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipesInclude<ExtArgs> | null;
    /**
     * Filter which Recipes to delete.
     */
    where: RecipesWhereUniqueInput;
  };

  /**
   * Recipes deleteMany
   */
  export type RecipesDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Recipes to delete
     */
    where?: RecipesWhereInput;
    /**
     * Limit how many Recipes to delete.
     */
    limit?: number;
  };

  /**
   * Recipes.ingredients
   */
  export type Recipes$ingredientsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsInclude<ExtArgs> | null;
    where?: IngredientsWhereInput;
    orderBy?:
      | IngredientsOrderByWithRelationInput
      | IngredientsOrderByWithRelationInput[];
    cursor?: IngredientsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: IngredientsScalarFieldEnum | IngredientsScalarFieldEnum[];
  };

  /**
   * Recipes.instructions
   */
  export type Recipes$instructionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsInclude<ExtArgs> | null;
    where?: InstructionsWhereInput;
    orderBy?:
      | InstructionsOrderByWithRelationInput
      | InstructionsOrderByWithRelationInput[];
    cursor?: InstructionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: InstructionsScalarFieldEnum | InstructionsScalarFieldEnum[];
  };

  /**
   * Recipes.recipe_food_allergies
   */
  export type Recipes$recipe_food_allergiesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesInclude<ExtArgs> | null;
    where?: RecipeFoodAllergiesWhereInput;
    orderBy?:
      | RecipeFoodAllergiesOrderByWithRelationInput
      | RecipeFoodAllergiesOrderByWithRelationInput[];
    cursor?: RecipeFoodAllergiesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      | RecipeFoodAllergiesScalarFieldEnum
      | RecipeFoodAllergiesScalarFieldEnum[];
  };

  /**
   * Recipes without action
   */
  export type RecipesDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Recipes
     */
    select?: RecipesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Recipes
     */
    omit?: RecipesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipesInclude<ExtArgs> | null;
  };

  /**
   * Model Ingredients
   */

  export type AggregateIngredients = {
    _count: IngredientsCountAggregateOutputType | null;
    _avg: IngredientsAvgAggregateOutputType | null;
    _sum: IngredientsSumAggregateOutputType | null;
    _min: IngredientsMinAggregateOutputType | null;
    _max: IngredientsMaxAggregateOutputType | null;
  };

  export type IngredientsAvgAggregateOutputType = {
    id: number | null;
    recipe_id: number | null;
  };

  export type IngredientsSumAggregateOutputType = {
    id: number | null;
    recipe_id: number | null;
  };

  export type IngredientsMinAggregateOutputType = {
    id: number | null;
    recipe_id: number | null;
    subrecipe_title: string | null;
    name: string | null;
    amount: string | null;
    unit: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type IngredientsMaxAggregateOutputType = {
    id: number | null;
    recipe_id: number | null;
    subrecipe_title: string | null;
    name: string | null;
    amount: string | null;
    unit: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type IngredientsCountAggregateOutputType = {
    id: number;
    recipe_id: number;
    subrecipe_title: number;
    name: number;
    amount: number;
    unit: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
  };

  export type IngredientsAvgAggregateInputType = {
    id?: true;
    recipe_id?: true;
  };

  export type IngredientsSumAggregateInputType = {
    id?: true;
    recipe_id?: true;
  };

  export type IngredientsMinAggregateInputType = {
    id?: true;
    recipe_id?: true;
    subrecipe_title?: true;
    name?: true;
    amount?: true;
    unit?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type IngredientsMaxAggregateInputType = {
    id?: true;
    recipe_id?: true;
    subrecipe_title?: true;
    name?: true;
    amount?: true;
    unit?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type IngredientsCountAggregateInputType = {
    id?: true;
    recipe_id?: true;
    subrecipe_title?: true;
    name?: true;
    amount?: true;
    unit?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
  };

  export type IngredientsAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Ingredients to aggregate.
     */
    where?: IngredientsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ingredients to fetch.
     */
    orderBy?:
      | IngredientsOrderByWithRelationInput
      | IngredientsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: IngredientsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ingredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Ingredients
     **/
    _count?: true | IngredientsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: IngredientsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: IngredientsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: IngredientsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: IngredientsMaxAggregateInputType;
  };

  export type GetIngredientsAggregateType<T extends IngredientsAggregateArgs> =
    {
      [P in keyof T & keyof AggregateIngredients]: P extends '_count' | 'count'
        ? T[P] extends true
          ? number
          : GetScalarType<T[P], AggregateIngredients[P]>
        : GetScalarType<T[P], AggregateIngredients[P]>;
    };

  export type IngredientsGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: IngredientsWhereInput;
    orderBy?:
      | IngredientsOrderByWithAggregationInput
      | IngredientsOrderByWithAggregationInput[];
    by: IngredientsScalarFieldEnum[] | IngredientsScalarFieldEnum;
    having?: IngredientsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IngredientsCountAggregateInputType | true;
    _avg?: IngredientsAvgAggregateInputType;
    _sum?: IngredientsSumAggregateInputType;
    _min?: IngredientsMinAggregateInputType;
    _max?: IngredientsMaxAggregateInputType;
  };

  export type IngredientsGroupByOutputType = {
    id: number;
    recipe_id: number;
    subrecipe_title: string | null;
    name: string;
    amount: string | null;
    unit: string | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    _count: IngredientsCountAggregateOutputType | null;
    _avg: IngredientsAvgAggregateOutputType | null;
    _sum: IngredientsSumAggregateOutputType | null;
    _min: IngredientsMinAggregateOutputType | null;
    _max: IngredientsMaxAggregateOutputType | null;
  };

  type GetIngredientsGroupByPayload<T extends IngredientsGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<IngredientsGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof IngredientsGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IngredientsGroupByOutputType[P]>
            : GetScalarType<T[P], IngredientsGroupByOutputType[P]>;
        }
      >
    >;

  export type IngredientsSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      recipe_id?: boolean;
      subrecipe_title?: boolean;
      name?: boolean;
      amount?: boolean;
      unit?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['ingredients']
  >;

  export type IngredientsSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      recipe_id?: boolean;
      subrecipe_title?: boolean;
      name?: boolean;
      amount?: boolean;
      unit?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['ingredients']
  >;

  export type IngredientsSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      recipe_id?: boolean;
      subrecipe_title?: boolean;
      name?: boolean;
      amount?: boolean;
      unit?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['ingredients']
  >;

  export type IngredientsSelectScalar = {
    id?: boolean;
    recipe_id?: boolean;
    subrecipe_title?: boolean;
    name?: boolean;
    amount?: boolean;
    unit?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
  };

  export type IngredientsOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'recipe_id'
    | 'subrecipe_title'
    | 'name'
    | 'amount'
    | 'unit'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at',
    ExtArgs['result']['ingredients']
  >;
  export type IngredientsInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
  };
  export type IngredientsIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
  };
  export type IngredientsIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
  };

  export type $IngredientsPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Ingredients';
    objects: {
      recipe: Prisma.$RecipesPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        recipe_id: number;
        subrecipe_title: string | null;
        name: string;
        amount: string | null;
        unit: string | null;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
      },
      ExtArgs['result']['ingredients']
    >;
    composites: {};
  };

  type IngredientsGetPayload<
    S extends boolean | null | undefined | IngredientsDefaultArgs,
  > = $Result.GetResult<Prisma.$IngredientsPayload, S>;

  type IngredientsCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    IngredientsFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: IngredientsCountAggregateInputType | true;
  };

  export interface IngredientsDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Ingredients'];
      meta: { name: 'Ingredients' };
    };
    /**
     * Find zero or one Ingredients that matches the filter.
     * @param {IngredientsFindUniqueArgs} args - Arguments to find a Ingredients
     * @example
     * // Get one Ingredients
     * const ingredients = await prisma.ingredients.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IngredientsFindUniqueArgs>(
      args: SelectSubset<T, IngredientsFindUniqueArgs<ExtArgs>>,
    ): Prisma__IngredientsClient<
      $Result.GetResult<
        Prisma.$IngredientsPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Ingredients that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IngredientsFindUniqueOrThrowArgs} args - Arguments to find a Ingredients
     * @example
     * // Get one Ingredients
     * const ingredients = await prisma.ingredients.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IngredientsFindUniqueOrThrowArgs>(
      args: SelectSubset<T, IngredientsFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__IngredientsClient<
      $Result.GetResult<
        Prisma.$IngredientsPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsFindFirstArgs} args - Arguments to find a Ingredients
     * @example
     * // Get one Ingredients
     * const ingredients = await prisma.ingredients.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IngredientsFindFirstArgs>(
      args?: SelectSubset<T, IngredientsFindFirstArgs<ExtArgs>>,
    ): Prisma__IngredientsClient<
      $Result.GetResult<
        Prisma.$IngredientsPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Ingredients that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsFindFirstOrThrowArgs} args - Arguments to find a Ingredients
     * @example
     * // Get one Ingredients
     * const ingredients = await prisma.ingredients.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IngredientsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, IngredientsFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__IngredientsClient<
      $Result.GetResult<
        Prisma.$IngredientsPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Ingredients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ingredients
     * const ingredients = await prisma.ingredients.findMany()
     *
     * // Get first 10 Ingredients
     * const ingredients = await prisma.ingredients.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const ingredientsWithIdOnly = await prisma.ingredients.findMany({ select: { id: true } })
     *
     */
    findMany<T extends IngredientsFindManyArgs>(
      args?: SelectSubset<T, IngredientsFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$IngredientsPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Ingredients.
     * @param {IngredientsCreateArgs} args - Arguments to create a Ingredients.
     * @example
     * // Create one Ingredients
     * const Ingredients = await prisma.ingredients.create({
     *   data: {
     *     // ... data to create a Ingredients
     *   }
     * })
     *
     */
    create<T extends IngredientsCreateArgs>(
      args: SelectSubset<T, IngredientsCreateArgs<ExtArgs>>,
    ): Prisma__IngredientsClient<
      $Result.GetResult<
        Prisma.$IngredientsPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Ingredients.
     * @param {IngredientsCreateManyArgs} args - Arguments to create many Ingredients.
     * @example
     * // Create many Ingredients
     * const ingredients = await prisma.ingredients.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends IngredientsCreateManyArgs>(
      args?: SelectSubset<T, IngredientsCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Ingredients and returns the data saved in the database.
     * @param {IngredientsCreateManyAndReturnArgs} args - Arguments to create many Ingredients.
     * @example
     * // Create many Ingredients
     * const ingredients = await prisma.ingredients.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Ingredients and only return the `id`
     * const ingredientsWithIdOnly = await prisma.ingredients.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends IngredientsCreateManyAndReturnArgs>(
      args?: SelectSubset<T, IngredientsCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$IngredientsPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Ingredients.
     * @param {IngredientsDeleteArgs} args - Arguments to delete one Ingredients.
     * @example
     * // Delete one Ingredients
     * const Ingredients = await prisma.ingredients.delete({
     *   where: {
     *     // ... filter to delete one Ingredients
     *   }
     * })
     *
     */
    delete<T extends IngredientsDeleteArgs>(
      args: SelectSubset<T, IngredientsDeleteArgs<ExtArgs>>,
    ): Prisma__IngredientsClient<
      $Result.GetResult<
        Prisma.$IngredientsPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Ingredients.
     * @param {IngredientsUpdateArgs} args - Arguments to update one Ingredients.
     * @example
     * // Update one Ingredients
     * const ingredients = await prisma.ingredients.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends IngredientsUpdateArgs>(
      args: SelectSubset<T, IngredientsUpdateArgs<ExtArgs>>,
    ): Prisma__IngredientsClient<
      $Result.GetResult<
        Prisma.$IngredientsPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Ingredients.
     * @param {IngredientsDeleteManyArgs} args - Arguments to filter Ingredients to delete.
     * @example
     * // Delete a few Ingredients
     * const { count } = await prisma.ingredients.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends IngredientsDeleteManyArgs>(
      args?: SelectSubset<T, IngredientsDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ingredients
     * const ingredients = await prisma.ingredients.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends IngredientsUpdateManyArgs>(
      args: SelectSubset<T, IngredientsUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Ingredients and returns the data updated in the database.
     * @param {IngredientsUpdateManyAndReturnArgs} args - Arguments to update many Ingredients.
     * @example
     * // Update many Ingredients
     * const ingredients = await prisma.ingredients.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Ingredients and only return the `id`
     * const ingredientsWithIdOnly = await prisma.ingredients.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends IngredientsUpdateManyAndReturnArgs>(
      args: SelectSubset<T, IngredientsUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$IngredientsPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Ingredients.
     * @param {IngredientsUpsertArgs} args - Arguments to update or create a Ingredients.
     * @example
     * // Update or create a Ingredients
     * const ingredients = await prisma.ingredients.upsert({
     *   create: {
     *     // ... data to create a Ingredients
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ingredients we want to update
     *   }
     * })
     */
    upsert<T extends IngredientsUpsertArgs>(
      args: SelectSubset<T, IngredientsUpsertArgs<ExtArgs>>,
    ): Prisma__IngredientsClient<
      $Result.GetResult<
        Prisma.$IngredientsPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsCountArgs} args - Arguments to filter Ingredients to count.
     * @example
     * // Count the number of Ingredients
     * const count = await prisma.ingredients.count({
     *   where: {
     *     // ... the filter for the Ingredients we want to count
     *   }
     * })
     **/
    count<T extends IngredientsCountArgs>(
      args?: Subset<T, IngredientsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IngredientsCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends IngredientsAggregateArgs>(
      args: Subset<T, IngredientsAggregateArgs>,
    ): Prisma.PrismaPromise<GetIngredientsAggregateType<T>>;

    /**
     * Group by Ingredients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IngredientsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends IngredientsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IngredientsGroupByArgs['orderBy'] }
        : { orderBy?: IngredientsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, IngredientsGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetIngredientsGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Ingredients model
     */
    readonly fields: IngredientsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ingredients.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IngredientsClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    recipe<T extends RecipesDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, RecipesDefaultArgs<ExtArgs>>,
    ): Prisma__RecipesClient<
      | $Result.GetResult<
          Prisma.$RecipesPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Ingredients model
   */
  interface IngredientsFieldRefs {
    readonly id: FieldRef<'Ingredients', 'Int'>;
    readonly recipe_id: FieldRef<'Ingredients', 'Int'>;
    readonly subrecipe_title: FieldRef<'Ingredients', 'String'>;
    readonly name: FieldRef<'Ingredients', 'String'>;
    readonly amount: FieldRef<'Ingredients', 'String'>;
    readonly unit: FieldRef<'Ingredients', 'String'>;
    readonly created_at: FieldRef<'Ingredients', 'DateTime'>;
    readonly updated_at: FieldRef<'Ingredients', 'DateTime'>;
    readonly deleted_at: FieldRef<'Ingredients', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Ingredients findUnique
   */
  export type IngredientsFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsInclude<ExtArgs> | null;
    /**
     * Filter, which Ingredients to fetch.
     */
    where: IngredientsWhereUniqueInput;
  };

  /**
   * Ingredients findUniqueOrThrow
   */
  export type IngredientsFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsInclude<ExtArgs> | null;
    /**
     * Filter, which Ingredients to fetch.
     */
    where: IngredientsWhereUniqueInput;
  };

  /**
   * Ingredients findFirst
   */
  export type IngredientsFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsInclude<ExtArgs> | null;
    /**
     * Filter, which Ingredients to fetch.
     */
    where?: IngredientsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ingredients to fetch.
     */
    orderBy?:
      | IngredientsOrderByWithRelationInput
      | IngredientsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Ingredients.
     */
    cursor?: IngredientsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ingredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Ingredients.
     */
    distinct?: IngredientsScalarFieldEnum | IngredientsScalarFieldEnum[];
  };

  /**
   * Ingredients findFirstOrThrow
   */
  export type IngredientsFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsInclude<ExtArgs> | null;
    /**
     * Filter, which Ingredients to fetch.
     */
    where?: IngredientsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ingredients to fetch.
     */
    orderBy?:
      | IngredientsOrderByWithRelationInput
      | IngredientsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Ingredients.
     */
    cursor?: IngredientsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ingredients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Ingredients.
     */
    distinct?: IngredientsScalarFieldEnum | IngredientsScalarFieldEnum[];
  };

  /**
   * Ingredients findMany
   */
  export type IngredientsFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsInclude<ExtArgs> | null;
    /**
     * Filter, which Ingredients to fetch.
     */
    where?: IngredientsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ingredients to fetch.
     */
    orderBy?:
      | IngredientsOrderByWithRelationInput
      | IngredientsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Ingredients.
     */
    cursor?: IngredientsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ingredients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ingredients.
     */
    skip?: number;
    distinct?: IngredientsScalarFieldEnum | IngredientsScalarFieldEnum[];
  };

  /**
   * Ingredients create
   */
  export type IngredientsCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsInclude<ExtArgs> | null;
    /**
     * The data needed to create a Ingredients.
     */
    data: XOR<IngredientsCreateInput, IngredientsUncheckedCreateInput>;
  };

  /**
   * Ingredients createMany
   */
  export type IngredientsCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Ingredients.
     */
    data: IngredientsCreateManyInput | IngredientsCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Ingredients createManyAndReturn
   */
  export type IngredientsCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * The data used to create many Ingredients.
     */
    data: IngredientsCreateManyInput | IngredientsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Ingredients update
   */
  export type IngredientsUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsInclude<ExtArgs> | null;
    /**
     * The data needed to update a Ingredients.
     */
    data: XOR<IngredientsUpdateInput, IngredientsUncheckedUpdateInput>;
    /**
     * Choose, which Ingredients to update.
     */
    where: IngredientsWhereUniqueInput;
  };

  /**
   * Ingredients updateMany
   */
  export type IngredientsUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Ingredients.
     */
    data: XOR<
      IngredientsUpdateManyMutationInput,
      IngredientsUncheckedUpdateManyInput
    >;
    /**
     * Filter which Ingredients to update
     */
    where?: IngredientsWhereInput;
    /**
     * Limit how many Ingredients to update.
     */
    limit?: number;
  };

  /**
   * Ingredients updateManyAndReturn
   */
  export type IngredientsUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * The data used to update Ingredients.
     */
    data: XOR<
      IngredientsUpdateManyMutationInput,
      IngredientsUncheckedUpdateManyInput
    >;
    /**
     * Filter which Ingredients to update
     */
    where?: IngredientsWhereInput;
    /**
     * Limit how many Ingredients to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Ingredients upsert
   */
  export type IngredientsUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsInclude<ExtArgs> | null;
    /**
     * The filter to search for the Ingredients to update in case it exists.
     */
    where: IngredientsWhereUniqueInput;
    /**
     * In case the Ingredients found by the `where` argument doesn't exist, create a new Ingredients with this data.
     */
    create: XOR<IngredientsCreateInput, IngredientsUncheckedCreateInput>;
    /**
     * In case the Ingredients was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IngredientsUpdateInput, IngredientsUncheckedUpdateInput>;
  };

  /**
   * Ingredients delete
   */
  export type IngredientsDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsInclude<ExtArgs> | null;
    /**
     * Filter which Ingredients to delete.
     */
    where: IngredientsWhereUniqueInput;
  };

  /**
   * Ingredients deleteMany
   */
  export type IngredientsDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Ingredients to delete
     */
    where?: IngredientsWhereInput;
    /**
     * Limit how many Ingredients to delete.
     */
    limit?: number;
  };

  /**
   * Ingredients without action
   */
  export type IngredientsDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Ingredients
     */
    select?: IngredientsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ingredients
     */
    omit?: IngredientsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IngredientsInclude<ExtArgs> | null;
  };

  /**
   * Model Instructions
   */

  export type AggregateInstructions = {
    _count: InstructionsCountAggregateOutputType | null;
    _avg: InstructionsAvgAggregateOutputType | null;
    _sum: InstructionsSumAggregateOutputType | null;
    _min: InstructionsMinAggregateOutputType | null;
    _max: InstructionsMaxAggregateOutputType | null;
  };

  export type InstructionsAvgAggregateOutputType = {
    id: number | null;
    recipe_id: number | null;
  };

  export type InstructionsSumAggregateOutputType = {
    id: number | null;
    recipe_id: number | null;
  };

  export type InstructionsMinAggregateOutputType = {
    id: number | null;
    recipe_id: number | null;
    subrecipe_title: string | null;
    body: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type InstructionsMaxAggregateOutputType = {
    id: number | null;
    recipe_id: number | null;
    subrecipe_title: string | null;
    body: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type InstructionsCountAggregateOutputType = {
    id: number;
    recipe_id: number;
    subrecipe_title: number;
    body: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
  };

  export type InstructionsAvgAggregateInputType = {
    id?: true;
    recipe_id?: true;
  };

  export type InstructionsSumAggregateInputType = {
    id?: true;
    recipe_id?: true;
  };

  export type InstructionsMinAggregateInputType = {
    id?: true;
    recipe_id?: true;
    subrecipe_title?: true;
    body?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type InstructionsMaxAggregateInputType = {
    id?: true;
    recipe_id?: true;
    subrecipe_title?: true;
    body?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type InstructionsCountAggregateInputType = {
    id?: true;
    recipe_id?: true;
    subrecipe_title?: true;
    body?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
  };

  export type InstructionsAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Instructions to aggregate.
     */
    where?: InstructionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Instructions to fetch.
     */
    orderBy?:
      | InstructionsOrderByWithRelationInput
      | InstructionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: InstructionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Instructions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Instructions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Instructions
     **/
    _count?: true | InstructionsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: InstructionsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: InstructionsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: InstructionsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: InstructionsMaxAggregateInputType;
  };

  export type GetInstructionsAggregateType<
    T extends InstructionsAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateInstructions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstructions[P]>
      : GetScalarType<T[P], AggregateInstructions[P]>;
  };

  export type InstructionsGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: InstructionsWhereInput;
    orderBy?:
      | InstructionsOrderByWithAggregationInput
      | InstructionsOrderByWithAggregationInput[];
    by: InstructionsScalarFieldEnum[] | InstructionsScalarFieldEnum;
    having?: InstructionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InstructionsCountAggregateInputType | true;
    _avg?: InstructionsAvgAggregateInputType;
    _sum?: InstructionsSumAggregateInputType;
    _min?: InstructionsMinAggregateInputType;
    _max?: InstructionsMaxAggregateInputType;
  };

  export type InstructionsGroupByOutputType = {
    id: number;
    recipe_id: number;
    subrecipe_title: string | null;
    body: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    _count: InstructionsCountAggregateOutputType | null;
    _avg: InstructionsAvgAggregateOutputType | null;
    _sum: InstructionsSumAggregateOutputType | null;
    _min: InstructionsMinAggregateOutputType | null;
    _max: InstructionsMaxAggregateOutputType | null;
  };

  type GetInstructionsGroupByPayload<T extends InstructionsGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<InstructionsGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof InstructionsGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstructionsGroupByOutputType[P]>
            : GetScalarType<T[P], InstructionsGroupByOutputType[P]>;
        }
      >
    >;

  export type InstructionsSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      recipe_id?: boolean;
      subrecipe_title?: boolean;
      body?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['instructions']
  >;

  export type InstructionsSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      recipe_id?: boolean;
      subrecipe_title?: boolean;
      body?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['instructions']
  >;

  export type InstructionsSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      recipe_id?: boolean;
      subrecipe_title?: boolean;
      body?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['instructions']
  >;

  export type InstructionsSelectScalar = {
    id?: boolean;
    recipe_id?: boolean;
    subrecipe_title?: boolean;
    body?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
  };

  export type InstructionsOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'recipe_id'
    | 'subrecipe_title'
    | 'body'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at',
    ExtArgs['result']['instructions']
  >;
  export type InstructionsInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
  };
  export type InstructionsIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
  };
  export type InstructionsIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
  };

  export type $InstructionsPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Instructions';
    objects: {
      recipe: Prisma.$RecipesPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        recipe_id: number;
        subrecipe_title: string | null;
        body: string;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
      },
      ExtArgs['result']['instructions']
    >;
    composites: {};
  };

  type InstructionsGetPayload<
    S extends boolean | null | undefined | InstructionsDefaultArgs,
  > = $Result.GetResult<Prisma.$InstructionsPayload, S>;

  type InstructionsCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    InstructionsFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: InstructionsCountAggregateInputType | true;
  };

  export interface InstructionsDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Instructions'];
      meta: { name: 'Instructions' };
    };
    /**
     * Find zero or one Instructions that matches the filter.
     * @param {InstructionsFindUniqueArgs} args - Arguments to find a Instructions
     * @example
     * // Get one Instructions
     * const instructions = await prisma.instructions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstructionsFindUniqueArgs>(
      args: SelectSubset<T, InstructionsFindUniqueArgs<ExtArgs>>,
    ): Prisma__InstructionsClient<
      $Result.GetResult<
        Prisma.$InstructionsPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Instructions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InstructionsFindUniqueOrThrowArgs} args - Arguments to find a Instructions
     * @example
     * // Get one Instructions
     * const instructions = await prisma.instructions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstructionsFindUniqueOrThrowArgs>(
      args: SelectSubset<T, InstructionsFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__InstructionsClient<
      $Result.GetResult<
        Prisma.$InstructionsPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Instructions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsFindFirstArgs} args - Arguments to find a Instructions
     * @example
     * // Get one Instructions
     * const instructions = await prisma.instructions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstructionsFindFirstArgs>(
      args?: SelectSubset<T, InstructionsFindFirstArgs<ExtArgs>>,
    ): Prisma__InstructionsClient<
      $Result.GetResult<
        Prisma.$InstructionsPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Instructions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsFindFirstOrThrowArgs} args - Arguments to find a Instructions
     * @example
     * // Get one Instructions
     * const instructions = await prisma.instructions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstructionsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, InstructionsFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__InstructionsClient<
      $Result.GetResult<
        Prisma.$InstructionsPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Instructions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Instructions
     * const instructions = await prisma.instructions.findMany()
     *
     * // Get first 10 Instructions
     * const instructions = await prisma.instructions.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const instructionsWithIdOnly = await prisma.instructions.findMany({ select: { id: true } })
     *
     */
    findMany<T extends InstructionsFindManyArgs>(
      args?: SelectSubset<T, InstructionsFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$InstructionsPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Instructions.
     * @param {InstructionsCreateArgs} args - Arguments to create a Instructions.
     * @example
     * // Create one Instructions
     * const Instructions = await prisma.instructions.create({
     *   data: {
     *     // ... data to create a Instructions
     *   }
     * })
     *
     */
    create<T extends InstructionsCreateArgs>(
      args: SelectSubset<T, InstructionsCreateArgs<ExtArgs>>,
    ): Prisma__InstructionsClient<
      $Result.GetResult<
        Prisma.$InstructionsPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Instructions.
     * @param {InstructionsCreateManyArgs} args - Arguments to create many Instructions.
     * @example
     * // Create many Instructions
     * const instructions = await prisma.instructions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends InstructionsCreateManyArgs>(
      args?: SelectSubset<T, InstructionsCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Instructions and returns the data saved in the database.
     * @param {InstructionsCreateManyAndReturnArgs} args - Arguments to create many Instructions.
     * @example
     * // Create many Instructions
     * const instructions = await prisma.instructions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Instructions and only return the `id`
     * const instructionsWithIdOnly = await prisma.instructions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends InstructionsCreateManyAndReturnArgs>(
      args?: SelectSubset<T, InstructionsCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$InstructionsPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Instructions.
     * @param {InstructionsDeleteArgs} args - Arguments to delete one Instructions.
     * @example
     * // Delete one Instructions
     * const Instructions = await prisma.instructions.delete({
     *   where: {
     *     // ... filter to delete one Instructions
     *   }
     * })
     *
     */
    delete<T extends InstructionsDeleteArgs>(
      args: SelectSubset<T, InstructionsDeleteArgs<ExtArgs>>,
    ): Prisma__InstructionsClient<
      $Result.GetResult<
        Prisma.$InstructionsPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Instructions.
     * @param {InstructionsUpdateArgs} args - Arguments to update one Instructions.
     * @example
     * // Update one Instructions
     * const instructions = await prisma.instructions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends InstructionsUpdateArgs>(
      args: SelectSubset<T, InstructionsUpdateArgs<ExtArgs>>,
    ): Prisma__InstructionsClient<
      $Result.GetResult<
        Prisma.$InstructionsPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Instructions.
     * @param {InstructionsDeleteManyArgs} args - Arguments to filter Instructions to delete.
     * @example
     * // Delete a few Instructions
     * const { count } = await prisma.instructions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends InstructionsDeleteManyArgs>(
      args?: SelectSubset<T, InstructionsDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Instructions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Instructions
     * const instructions = await prisma.instructions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends InstructionsUpdateManyArgs>(
      args: SelectSubset<T, InstructionsUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Instructions and returns the data updated in the database.
     * @param {InstructionsUpdateManyAndReturnArgs} args - Arguments to update many Instructions.
     * @example
     * // Update many Instructions
     * const instructions = await prisma.instructions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Instructions and only return the `id`
     * const instructionsWithIdOnly = await prisma.instructions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends InstructionsUpdateManyAndReturnArgs>(
      args: SelectSubset<T, InstructionsUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$InstructionsPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Instructions.
     * @param {InstructionsUpsertArgs} args - Arguments to update or create a Instructions.
     * @example
     * // Update or create a Instructions
     * const instructions = await prisma.instructions.upsert({
     *   create: {
     *     // ... data to create a Instructions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Instructions we want to update
     *   }
     * })
     */
    upsert<T extends InstructionsUpsertArgs>(
      args: SelectSubset<T, InstructionsUpsertArgs<ExtArgs>>,
    ): Prisma__InstructionsClient<
      $Result.GetResult<
        Prisma.$InstructionsPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Instructions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsCountArgs} args - Arguments to filter Instructions to count.
     * @example
     * // Count the number of Instructions
     * const count = await prisma.instructions.count({
     *   where: {
     *     // ... the filter for the Instructions we want to count
     *   }
     * })
     **/
    count<T extends InstructionsCountArgs>(
      args?: Subset<T, InstructionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstructionsCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Instructions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends InstructionsAggregateArgs>(
      args: Subset<T, InstructionsAggregateArgs>,
    ): Prisma.PrismaPromise<GetInstructionsAggregateType<T>>;

    /**
     * Group by Instructions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends InstructionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstructionsGroupByArgs['orderBy'] }
        : { orderBy?: InstructionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, InstructionsGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetInstructionsGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Instructions model
     */
    readonly fields: InstructionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Instructions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstructionsClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    recipe<T extends RecipesDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, RecipesDefaultArgs<ExtArgs>>,
    ): Prisma__RecipesClient<
      | $Result.GetResult<
          Prisma.$RecipesPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Instructions model
   */
  interface InstructionsFieldRefs {
    readonly id: FieldRef<'Instructions', 'Int'>;
    readonly recipe_id: FieldRef<'Instructions', 'Int'>;
    readonly subrecipe_title: FieldRef<'Instructions', 'String'>;
    readonly body: FieldRef<'Instructions', 'String'>;
    readonly created_at: FieldRef<'Instructions', 'DateTime'>;
    readonly updated_at: FieldRef<'Instructions', 'DateTime'>;
    readonly deleted_at: FieldRef<'Instructions', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Instructions findUnique
   */
  export type InstructionsFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsInclude<ExtArgs> | null;
    /**
     * Filter, which Instructions to fetch.
     */
    where: InstructionsWhereUniqueInput;
  };

  /**
   * Instructions findUniqueOrThrow
   */
  export type InstructionsFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsInclude<ExtArgs> | null;
    /**
     * Filter, which Instructions to fetch.
     */
    where: InstructionsWhereUniqueInput;
  };

  /**
   * Instructions findFirst
   */
  export type InstructionsFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsInclude<ExtArgs> | null;
    /**
     * Filter, which Instructions to fetch.
     */
    where?: InstructionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Instructions to fetch.
     */
    orderBy?:
      | InstructionsOrderByWithRelationInput
      | InstructionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Instructions.
     */
    cursor?: InstructionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Instructions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Instructions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Instructions.
     */
    distinct?: InstructionsScalarFieldEnum | InstructionsScalarFieldEnum[];
  };

  /**
   * Instructions findFirstOrThrow
   */
  export type InstructionsFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsInclude<ExtArgs> | null;
    /**
     * Filter, which Instructions to fetch.
     */
    where?: InstructionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Instructions to fetch.
     */
    orderBy?:
      | InstructionsOrderByWithRelationInput
      | InstructionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Instructions.
     */
    cursor?: InstructionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Instructions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Instructions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Instructions.
     */
    distinct?: InstructionsScalarFieldEnum | InstructionsScalarFieldEnum[];
  };

  /**
   * Instructions findMany
   */
  export type InstructionsFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsInclude<ExtArgs> | null;
    /**
     * Filter, which Instructions to fetch.
     */
    where?: InstructionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Instructions to fetch.
     */
    orderBy?:
      | InstructionsOrderByWithRelationInput
      | InstructionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Instructions.
     */
    cursor?: InstructionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Instructions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Instructions.
     */
    skip?: number;
    distinct?: InstructionsScalarFieldEnum | InstructionsScalarFieldEnum[];
  };

  /**
   * Instructions create
   */
  export type InstructionsCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsInclude<ExtArgs> | null;
    /**
     * The data needed to create a Instructions.
     */
    data: XOR<InstructionsCreateInput, InstructionsUncheckedCreateInput>;
  };

  /**
   * Instructions createMany
   */
  export type InstructionsCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Instructions.
     */
    data: InstructionsCreateManyInput | InstructionsCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Instructions createManyAndReturn
   */
  export type InstructionsCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * The data used to create many Instructions.
     */
    data: InstructionsCreateManyInput | InstructionsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Instructions update
   */
  export type InstructionsUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsInclude<ExtArgs> | null;
    /**
     * The data needed to update a Instructions.
     */
    data: XOR<InstructionsUpdateInput, InstructionsUncheckedUpdateInput>;
    /**
     * Choose, which Instructions to update.
     */
    where: InstructionsWhereUniqueInput;
  };

  /**
   * Instructions updateMany
   */
  export type InstructionsUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Instructions.
     */
    data: XOR<
      InstructionsUpdateManyMutationInput,
      InstructionsUncheckedUpdateManyInput
    >;
    /**
     * Filter which Instructions to update
     */
    where?: InstructionsWhereInput;
    /**
     * Limit how many Instructions to update.
     */
    limit?: number;
  };

  /**
   * Instructions updateManyAndReturn
   */
  export type InstructionsUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * The data used to update Instructions.
     */
    data: XOR<
      InstructionsUpdateManyMutationInput,
      InstructionsUncheckedUpdateManyInput
    >;
    /**
     * Filter which Instructions to update
     */
    where?: InstructionsWhereInput;
    /**
     * Limit how many Instructions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Instructions upsert
   */
  export type InstructionsUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsInclude<ExtArgs> | null;
    /**
     * The filter to search for the Instructions to update in case it exists.
     */
    where: InstructionsWhereUniqueInput;
    /**
     * In case the Instructions found by the `where` argument doesn't exist, create a new Instructions with this data.
     */
    create: XOR<InstructionsCreateInput, InstructionsUncheckedCreateInput>;
    /**
     * In case the Instructions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstructionsUpdateInput, InstructionsUncheckedUpdateInput>;
  };

  /**
   * Instructions delete
   */
  export type InstructionsDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsInclude<ExtArgs> | null;
    /**
     * Filter which Instructions to delete.
     */
    where: InstructionsWhereUniqueInput;
  };

  /**
   * Instructions deleteMany
   */
  export type InstructionsDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Instructions to delete
     */
    where?: InstructionsWhereInput;
    /**
     * Limit how many Instructions to delete.
     */
    limit?: number;
  };

  /**
   * Instructions without action
   */
  export type InstructionsDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructionsInclude<ExtArgs> | null;
  };

  /**
   * Model FoodAllergies
   */

  export type AggregateFoodAllergies = {
    _count: FoodAllergiesCountAggregateOutputType | null;
    _avg: FoodAllergiesAvgAggregateOutputType | null;
    _sum: FoodAllergiesSumAggregateOutputType | null;
    _min: FoodAllergiesMinAggregateOutputType | null;
    _max: FoodAllergiesMaxAggregateOutputType | null;
  };

  export type FoodAllergiesAvgAggregateOutputType = {
    id: number | null;
  };

  export type FoodAllergiesSumAggregateOutputType = {
    id: number | null;
  };

  export type FoodAllergiesMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type FoodAllergiesMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type FoodAllergiesCountAggregateOutputType = {
    id: number;
    name: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
  };

  export type FoodAllergiesAvgAggregateInputType = {
    id?: true;
  };

  export type FoodAllergiesSumAggregateInputType = {
    id?: true;
  };

  export type FoodAllergiesMinAggregateInputType = {
    id?: true;
    name?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type FoodAllergiesMaxAggregateInputType = {
    id?: true;
    name?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type FoodAllergiesCountAggregateInputType = {
    id?: true;
    name?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
  };

  export type FoodAllergiesAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which FoodAllergies to aggregate.
     */
    where?: FoodAllergiesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FoodAllergies to fetch.
     */
    orderBy?:
      | FoodAllergiesOrderByWithRelationInput
      | FoodAllergiesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: FoodAllergiesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FoodAllergies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FoodAllergies.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FoodAllergies
     **/
    _count?: true | FoodAllergiesCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: FoodAllergiesAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: FoodAllergiesSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: FoodAllergiesMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: FoodAllergiesMaxAggregateInputType;
  };

  export type GetFoodAllergiesAggregateType<
    T extends FoodAllergiesAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateFoodAllergies]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFoodAllergies[P]>
      : GetScalarType<T[P], AggregateFoodAllergies[P]>;
  };

  export type FoodAllergiesGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: FoodAllergiesWhereInput;
    orderBy?:
      | FoodAllergiesOrderByWithAggregationInput
      | FoodAllergiesOrderByWithAggregationInput[];
    by: FoodAllergiesScalarFieldEnum[] | FoodAllergiesScalarFieldEnum;
    having?: FoodAllergiesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FoodAllergiesCountAggregateInputType | true;
    _avg?: FoodAllergiesAvgAggregateInputType;
    _sum?: FoodAllergiesSumAggregateInputType;
    _min?: FoodAllergiesMinAggregateInputType;
    _max?: FoodAllergiesMaxAggregateInputType;
  };

  export type FoodAllergiesGroupByOutputType = {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    _count: FoodAllergiesCountAggregateOutputType | null;
    _avg: FoodAllergiesAvgAggregateOutputType | null;
    _sum: FoodAllergiesSumAggregateOutputType | null;
    _min: FoodAllergiesMinAggregateOutputType | null;
    _max: FoodAllergiesMaxAggregateOutputType | null;
  };

  type GetFoodAllergiesGroupByPayload<T extends FoodAllergiesGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<FoodAllergiesGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof FoodAllergiesGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoodAllergiesGroupByOutputType[P]>
            : GetScalarType<T[P], FoodAllergiesGroupByOutputType[P]>;
        }
      >
    >;

  export type FoodAllergiesSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      recipe_food_allergies?:
        | boolean
        | FoodAllergies$recipe_food_allergiesArgs<ExtArgs>;
      _count?: boolean | FoodAllergiesCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['foodAllergies']
  >;

  export type FoodAllergiesSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
    },
    ExtArgs['result']['foodAllergies']
  >;

  export type FoodAllergiesSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
    },
    ExtArgs['result']['foodAllergies']
  >;

  export type FoodAllergiesSelectScalar = {
    id?: boolean;
    name?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
  };

  export type FoodAllergiesOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'name' | 'created_at' | 'updated_at' | 'deleted_at',
    ExtArgs['result']['foodAllergies']
  >;
  export type FoodAllergiesInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    recipe_food_allergies?:
      | boolean
      | FoodAllergies$recipe_food_allergiesArgs<ExtArgs>;
    _count?: boolean | FoodAllergiesCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type FoodAllergiesIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type FoodAllergiesIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $FoodAllergiesPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'FoodAllergies';
    objects: {
      recipe_food_allergies: Prisma.$RecipeFoodAllergiesPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
      },
      ExtArgs['result']['foodAllergies']
    >;
    composites: {};
  };

  type FoodAllergiesGetPayload<
    S extends boolean | null | undefined | FoodAllergiesDefaultArgs,
  > = $Result.GetResult<Prisma.$FoodAllergiesPayload, S>;

  type FoodAllergiesCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    FoodAllergiesFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: FoodAllergiesCountAggregateInputType | true;
  };

  export interface FoodAllergiesDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['FoodAllergies'];
      meta: { name: 'FoodAllergies' };
    };
    /**
     * Find zero or one FoodAllergies that matches the filter.
     * @param {FoodAllergiesFindUniqueArgs} args - Arguments to find a FoodAllergies
     * @example
     * // Get one FoodAllergies
     * const foodAllergies = await prisma.foodAllergies.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoodAllergiesFindUniqueArgs>(
      args: SelectSubset<T, FoodAllergiesFindUniqueArgs<ExtArgs>>,
    ): Prisma__FoodAllergiesClient<
      $Result.GetResult<
        Prisma.$FoodAllergiesPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one FoodAllergies that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FoodAllergiesFindUniqueOrThrowArgs} args - Arguments to find a FoodAllergies
     * @example
     * // Get one FoodAllergies
     * const foodAllergies = await prisma.foodAllergies.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoodAllergiesFindUniqueOrThrowArgs>(
      args: SelectSubset<T, FoodAllergiesFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__FoodAllergiesClient<
      $Result.GetResult<
        Prisma.$FoodAllergiesPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first FoodAllergies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodAllergiesFindFirstArgs} args - Arguments to find a FoodAllergies
     * @example
     * // Get one FoodAllergies
     * const foodAllergies = await prisma.foodAllergies.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoodAllergiesFindFirstArgs>(
      args?: SelectSubset<T, FoodAllergiesFindFirstArgs<ExtArgs>>,
    ): Prisma__FoodAllergiesClient<
      $Result.GetResult<
        Prisma.$FoodAllergiesPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first FoodAllergies that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodAllergiesFindFirstOrThrowArgs} args - Arguments to find a FoodAllergies
     * @example
     * // Get one FoodAllergies
     * const foodAllergies = await prisma.foodAllergies.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoodAllergiesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FoodAllergiesFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__FoodAllergiesClient<
      $Result.GetResult<
        Prisma.$FoodAllergiesPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more FoodAllergies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodAllergiesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FoodAllergies
     * const foodAllergies = await prisma.foodAllergies.findMany()
     *
     * // Get first 10 FoodAllergies
     * const foodAllergies = await prisma.foodAllergies.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const foodAllergiesWithIdOnly = await prisma.foodAllergies.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FoodAllergiesFindManyArgs>(
      args?: SelectSubset<T, FoodAllergiesFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$FoodAllergiesPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a FoodAllergies.
     * @param {FoodAllergiesCreateArgs} args - Arguments to create a FoodAllergies.
     * @example
     * // Create one FoodAllergies
     * const FoodAllergies = await prisma.foodAllergies.create({
     *   data: {
     *     // ... data to create a FoodAllergies
     *   }
     * })
     *
     */
    create<T extends FoodAllergiesCreateArgs>(
      args: SelectSubset<T, FoodAllergiesCreateArgs<ExtArgs>>,
    ): Prisma__FoodAllergiesClient<
      $Result.GetResult<
        Prisma.$FoodAllergiesPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many FoodAllergies.
     * @param {FoodAllergiesCreateManyArgs} args - Arguments to create many FoodAllergies.
     * @example
     * // Create many FoodAllergies
     * const foodAllergies = await prisma.foodAllergies.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FoodAllergiesCreateManyArgs>(
      args?: SelectSubset<T, FoodAllergiesCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many FoodAllergies and returns the data saved in the database.
     * @param {FoodAllergiesCreateManyAndReturnArgs} args - Arguments to create many FoodAllergies.
     * @example
     * // Create many FoodAllergies
     * const foodAllergies = await prisma.foodAllergies.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FoodAllergies and only return the `id`
     * const foodAllergiesWithIdOnly = await prisma.foodAllergies.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FoodAllergiesCreateManyAndReturnArgs>(
      args?: SelectSubset<T, FoodAllergiesCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$FoodAllergiesPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a FoodAllergies.
     * @param {FoodAllergiesDeleteArgs} args - Arguments to delete one FoodAllergies.
     * @example
     * // Delete one FoodAllergies
     * const FoodAllergies = await prisma.foodAllergies.delete({
     *   where: {
     *     // ... filter to delete one FoodAllergies
     *   }
     * })
     *
     */
    delete<T extends FoodAllergiesDeleteArgs>(
      args: SelectSubset<T, FoodAllergiesDeleteArgs<ExtArgs>>,
    ): Prisma__FoodAllergiesClient<
      $Result.GetResult<
        Prisma.$FoodAllergiesPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one FoodAllergies.
     * @param {FoodAllergiesUpdateArgs} args - Arguments to update one FoodAllergies.
     * @example
     * // Update one FoodAllergies
     * const foodAllergies = await prisma.foodAllergies.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FoodAllergiesUpdateArgs>(
      args: SelectSubset<T, FoodAllergiesUpdateArgs<ExtArgs>>,
    ): Prisma__FoodAllergiesClient<
      $Result.GetResult<
        Prisma.$FoodAllergiesPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more FoodAllergies.
     * @param {FoodAllergiesDeleteManyArgs} args - Arguments to filter FoodAllergies to delete.
     * @example
     * // Delete a few FoodAllergies
     * const { count } = await prisma.foodAllergies.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FoodAllergiesDeleteManyArgs>(
      args?: SelectSubset<T, FoodAllergiesDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more FoodAllergies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodAllergiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FoodAllergies
     * const foodAllergies = await prisma.foodAllergies.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FoodAllergiesUpdateManyArgs>(
      args: SelectSubset<T, FoodAllergiesUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more FoodAllergies and returns the data updated in the database.
     * @param {FoodAllergiesUpdateManyAndReturnArgs} args - Arguments to update many FoodAllergies.
     * @example
     * // Update many FoodAllergies
     * const foodAllergies = await prisma.foodAllergies.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FoodAllergies and only return the `id`
     * const foodAllergiesWithIdOnly = await prisma.foodAllergies.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends FoodAllergiesUpdateManyAndReturnArgs>(
      args: SelectSubset<T, FoodAllergiesUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$FoodAllergiesPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one FoodAllergies.
     * @param {FoodAllergiesUpsertArgs} args - Arguments to update or create a FoodAllergies.
     * @example
     * // Update or create a FoodAllergies
     * const foodAllergies = await prisma.foodAllergies.upsert({
     *   create: {
     *     // ... data to create a FoodAllergies
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FoodAllergies we want to update
     *   }
     * })
     */
    upsert<T extends FoodAllergiesUpsertArgs>(
      args: SelectSubset<T, FoodAllergiesUpsertArgs<ExtArgs>>,
    ): Prisma__FoodAllergiesClient<
      $Result.GetResult<
        Prisma.$FoodAllergiesPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of FoodAllergies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodAllergiesCountArgs} args - Arguments to filter FoodAllergies to count.
     * @example
     * // Count the number of FoodAllergies
     * const count = await prisma.foodAllergies.count({
     *   where: {
     *     // ... the filter for the FoodAllergies we want to count
     *   }
     * })
     **/
    count<T extends FoodAllergiesCountArgs>(
      args?: Subset<T, FoodAllergiesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoodAllergiesCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a FoodAllergies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodAllergiesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends FoodAllergiesAggregateArgs>(
      args: Subset<T, FoodAllergiesAggregateArgs>,
    ): Prisma.PrismaPromise<GetFoodAllergiesAggregateType<T>>;

    /**
     * Group by FoodAllergies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodAllergiesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends FoodAllergiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FoodAllergiesGroupByArgs['orderBy'] }
        : { orderBy?: FoodAllergiesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, FoodAllergiesGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetFoodAllergiesGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FoodAllergies model
     */
    readonly fields: FoodAllergiesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FoodAllergies.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FoodAllergiesClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    recipe_food_allergies<
      T extends FoodAllergies$recipe_food_allergiesArgs<ExtArgs> = {},
    >(
      args?: Subset<T, FoodAllergies$recipe_food_allergiesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the FoodAllergies model
   */
  interface FoodAllergiesFieldRefs {
    readonly id: FieldRef<'FoodAllergies', 'Int'>;
    readonly name: FieldRef<'FoodAllergies', 'String'>;
    readonly created_at: FieldRef<'FoodAllergies', 'DateTime'>;
    readonly updated_at: FieldRef<'FoodAllergies', 'DateTime'>;
    readonly deleted_at: FieldRef<'FoodAllergies', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * FoodAllergies findUnique
   */
  export type FoodAllergiesFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergies
     */
    select?: FoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodAllergies
     */
    omit?: FoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodAllergiesInclude<ExtArgs> | null;
    /**
     * Filter, which FoodAllergies to fetch.
     */
    where: FoodAllergiesWhereUniqueInput;
  };

  /**
   * FoodAllergies findUniqueOrThrow
   */
  export type FoodAllergiesFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergies
     */
    select?: FoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodAllergies
     */
    omit?: FoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodAllergiesInclude<ExtArgs> | null;
    /**
     * Filter, which FoodAllergies to fetch.
     */
    where: FoodAllergiesWhereUniqueInput;
  };

  /**
   * FoodAllergies findFirst
   */
  export type FoodAllergiesFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergies
     */
    select?: FoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodAllergies
     */
    omit?: FoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodAllergiesInclude<ExtArgs> | null;
    /**
     * Filter, which FoodAllergies to fetch.
     */
    where?: FoodAllergiesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FoodAllergies to fetch.
     */
    orderBy?:
      | FoodAllergiesOrderByWithRelationInput
      | FoodAllergiesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FoodAllergies.
     */
    cursor?: FoodAllergiesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FoodAllergies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FoodAllergies.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FoodAllergies.
     */
    distinct?: FoodAllergiesScalarFieldEnum | FoodAllergiesScalarFieldEnum[];
  };

  /**
   * FoodAllergies findFirstOrThrow
   */
  export type FoodAllergiesFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergies
     */
    select?: FoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodAllergies
     */
    omit?: FoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodAllergiesInclude<ExtArgs> | null;
    /**
     * Filter, which FoodAllergies to fetch.
     */
    where?: FoodAllergiesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FoodAllergies to fetch.
     */
    orderBy?:
      | FoodAllergiesOrderByWithRelationInput
      | FoodAllergiesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FoodAllergies.
     */
    cursor?: FoodAllergiesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FoodAllergies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FoodAllergies.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FoodAllergies.
     */
    distinct?: FoodAllergiesScalarFieldEnum | FoodAllergiesScalarFieldEnum[];
  };

  /**
   * FoodAllergies findMany
   */
  export type FoodAllergiesFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergies
     */
    select?: FoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodAllergies
     */
    omit?: FoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodAllergiesInclude<ExtArgs> | null;
    /**
     * Filter, which FoodAllergies to fetch.
     */
    where?: FoodAllergiesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FoodAllergies to fetch.
     */
    orderBy?:
      | FoodAllergiesOrderByWithRelationInput
      | FoodAllergiesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FoodAllergies.
     */
    cursor?: FoodAllergiesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FoodAllergies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FoodAllergies.
     */
    skip?: number;
    distinct?: FoodAllergiesScalarFieldEnum | FoodAllergiesScalarFieldEnum[];
  };

  /**
   * FoodAllergies create
   */
  export type FoodAllergiesCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergies
     */
    select?: FoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodAllergies
     */
    omit?: FoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodAllergiesInclude<ExtArgs> | null;
    /**
     * The data needed to create a FoodAllergies.
     */
    data: XOR<FoodAllergiesCreateInput, FoodAllergiesUncheckedCreateInput>;
  };

  /**
   * FoodAllergies createMany
   */
  export type FoodAllergiesCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many FoodAllergies.
     */
    data: FoodAllergiesCreateManyInput | FoodAllergiesCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * FoodAllergies createManyAndReturn
   */
  export type FoodAllergiesCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergies
     */
    select?: FoodAllergiesSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodAllergies
     */
    omit?: FoodAllergiesOmit<ExtArgs> | null;
    /**
     * The data used to create many FoodAllergies.
     */
    data: FoodAllergiesCreateManyInput | FoodAllergiesCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * FoodAllergies update
   */
  export type FoodAllergiesUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergies
     */
    select?: FoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodAllergies
     */
    omit?: FoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodAllergiesInclude<ExtArgs> | null;
    /**
     * The data needed to update a FoodAllergies.
     */
    data: XOR<FoodAllergiesUpdateInput, FoodAllergiesUncheckedUpdateInput>;
    /**
     * Choose, which FoodAllergies to update.
     */
    where: FoodAllergiesWhereUniqueInput;
  };

  /**
   * FoodAllergies updateMany
   */
  export type FoodAllergiesUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update FoodAllergies.
     */
    data: XOR<
      FoodAllergiesUpdateManyMutationInput,
      FoodAllergiesUncheckedUpdateManyInput
    >;
    /**
     * Filter which FoodAllergies to update
     */
    where?: FoodAllergiesWhereInput;
    /**
     * Limit how many FoodAllergies to update.
     */
    limit?: number;
  };

  /**
   * FoodAllergies updateManyAndReturn
   */
  export type FoodAllergiesUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergies
     */
    select?: FoodAllergiesSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodAllergies
     */
    omit?: FoodAllergiesOmit<ExtArgs> | null;
    /**
     * The data used to update FoodAllergies.
     */
    data: XOR<
      FoodAllergiesUpdateManyMutationInput,
      FoodAllergiesUncheckedUpdateManyInput
    >;
    /**
     * Filter which FoodAllergies to update
     */
    where?: FoodAllergiesWhereInput;
    /**
     * Limit how many FoodAllergies to update.
     */
    limit?: number;
  };

  /**
   * FoodAllergies upsert
   */
  export type FoodAllergiesUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergies
     */
    select?: FoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodAllergies
     */
    omit?: FoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodAllergiesInclude<ExtArgs> | null;
    /**
     * The filter to search for the FoodAllergies to update in case it exists.
     */
    where: FoodAllergiesWhereUniqueInput;
    /**
     * In case the FoodAllergies found by the `where` argument doesn't exist, create a new FoodAllergies with this data.
     */
    create: XOR<FoodAllergiesCreateInput, FoodAllergiesUncheckedCreateInput>;
    /**
     * In case the FoodAllergies was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FoodAllergiesUpdateInput, FoodAllergiesUncheckedUpdateInput>;
  };

  /**
   * FoodAllergies delete
   */
  export type FoodAllergiesDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergies
     */
    select?: FoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodAllergies
     */
    omit?: FoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodAllergiesInclude<ExtArgs> | null;
    /**
     * Filter which FoodAllergies to delete.
     */
    where: FoodAllergiesWhereUniqueInput;
  };

  /**
   * FoodAllergies deleteMany
   */
  export type FoodAllergiesDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which FoodAllergies to delete
     */
    where?: FoodAllergiesWhereInput;
    /**
     * Limit how many FoodAllergies to delete.
     */
    limit?: number;
  };

  /**
   * FoodAllergies.recipe_food_allergies
   */
  export type FoodAllergies$recipe_food_allergiesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesInclude<ExtArgs> | null;
    where?: RecipeFoodAllergiesWhereInput;
    orderBy?:
      | RecipeFoodAllergiesOrderByWithRelationInput
      | RecipeFoodAllergiesOrderByWithRelationInput[];
    cursor?: RecipeFoodAllergiesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      | RecipeFoodAllergiesScalarFieldEnum
      | RecipeFoodAllergiesScalarFieldEnum[];
  };

  /**
   * FoodAllergies without action
   */
  export type FoodAllergiesDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FoodAllergies
     */
    select?: FoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodAllergies
     */
    omit?: FoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodAllergiesInclude<ExtArgs> | null;
  };

  /**
   * Model RecipeFoodAllergies
   */

  export type AggregateRecipeFoodAllergies = {
    _count: RecipeFoodAllergiesCountAggregateOutputType | null;
    _avg: RecipeFoodAllergiesAvgAggregateOutputType | null;
    _sum: RecipeFoodAllergiesSumAggregateOutputType | null;
    _min: RecipeFoodAllergiesMinAggregateOutputType | null;
    _max: RecipeFoodAllergiesMaxAggregateOutputType | null;
  };

  export type RecipeFoodAllergiesAvgAggregateOutputType = {
    id: number | null;
    recipe_id: number | null;
    food_allergy_id: number | null;
  };

  export type RecipeFoodAllergiesSumAggregateOutputType = {
    id: number | null;
    recipe_id: number | null;
    food_allergy_id: number | null;
  };

  export type RecipeFoodAllergiesMinAggregateOutputType = {
    id: number | null;
    recipe_id: number | null;
    food_allergy_id: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type RecipeFoodAllergiesMaxAggregateOutputType = {
    id: number | null;
    recipe_id: number | null;
    food_allergy_id: number | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
  };

  export type RecipeFoodAllergiesCountAggregateOutputType = {
    id: number;
    recipe_id: number;
    food_allergy_id: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    _all: number;
  };

  export type RecipeFoodAllergiesAvgAggregateInputType = {
    id?: true;
    recipe_id?: true;
    food_allergy_id?: true;
  };

  export type RecipeFoodAllergiesSumAggregateInputType = {
    id?: true;
    recipe_id?: true;
    food_allergy_id?: true;
  };

  export type RecipeFoodAllergiesMinAggregateInputType = {
    id?: true;
    recipe_id?: true;
    food_allergy_id?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type RecipeFoodAllergiesMaxAggregateInputType = {
    id?: true;
    recipe_id?: true;
    food_allergy_id?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
  };

  export type RecipeFoodAllergiesCountAggregateInputType = {
    id?: true;
    recipe_id?: true;
    food_allergy_id?: true;
    created_at?: true;
    updated_at?: true;
    deleted_at?: true;
    _all?: true;
  };

  export type RecipeFoodAllergiesAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RecipeFoodAllergies to aggregate.
     */
    where?: RecipeFoodAllergiesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RecipeFoodAllergies to fetch.
     */
    orderBy?:
      | RecipeFoodAllergiesOrderByWithRelationInput
      | RecipeFoodAllergiesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RecipeFoodAllergiesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RecipeFoodAllergies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RecipeFoodAllergies.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RecipeFoodAllergies
     **/
    _count?: true | RecipeFoodAllergiesCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: RecipeFoodAllergiesAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: RecipeFoodAllergiesSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RecipeFoodAllergiesMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RecipeFoodAllergiesMaxAggregateInputType;
  };

  export type GetRecipeFoodAllergiesAggregateType<
    T extends RecipeFoodAllergiesAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateRecipeFoodAllergies]: P extends
      | '_count'
      | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipeFoodAllergies[P]>
      : GetScalarType<T[P], AggregateRecipeFoodAllergies[P]>;
  };

  export type RecipeFoodAllergiesGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RecipeFoodAllergiesWhereInput;
    orderBy?:
      | RecipeFoodAllergiesOrderByWithAggregationInput
      | RecipeFoodAllergiesOrderByWithAggregationInput[];
    by:
      | RecipeFoodAllergiesScalarFieldEnum[]
      | RecipeFoodAllergiesScalarFieldEnum;
    having?: RecipeFoodAllergiesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecipeFoodAllergiesCountAggregateInputType | true;
    _avg?: RecipeFoodAllergiesAvgAggregateInputType;
    _sum?: RecipeFoodAllergiesSumAggregateInputType;
    _min?: RecipeFoodAllergiesMinAggregateInputType;
    _max?: RecipeFoodAllergiesMaxAggregateInputType;
  };

  export type RecipeFoodAllergiesGroupByOutputType = {
    id: number;
    recipe_id: number;
    food_allergy_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    _count: RecipeFoodAllergiesCountAggregateOutputType | null;
    _avg: RecipeFoodAllergiesAvgAggregateOutputType | null;
    _sum: RecipeFoodAllergiesSumAggregateOutputType | null;
    _min: RecipeFoodAllergiesMinAggregateOutputType | null;
    _max: RecipeFoodAllergiesMaxAggregateOutputType | null;
  };

  type GetRecipeFoodAllergiesGroupByPayload<
    T extends RecipeFoodAllergiesGroupByArgs,
  > = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeFoodAllergiesGroupByOutputType, T['by']> & {
        [P in keyof T &
          keyof RecipeFoodAllergiesGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], RecipeFoodAllergiesGroupByOutputType[P]>
          : GetScalarType<T[P], RecipeFoodAllergiesGroupByOutputType[P]>;
      }
    >
  >;

  export type RecipeFoodAllergiesSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      recipe_id?: boolean;
      food_allergy_id?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
      food_allergy?: boolean | FoodAllergiesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['recipeFoodAllergies']
  >;

  export type RecipeFoodAllergiesSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      recipe_id?: boolean;
      food_allergy_id?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
      food_allergy?: boolean | FoodAllergiesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['recipeFoodAllergies']
  >;

  export type RecipeFoodAllergiesSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      recipe_id?: boolean;
      food_allergy_id?: boolean;
      created_at?: boolean;
      updated_at?: boolean;
      deleted_at?: boolean;
      recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
      food_allergy?: boolean | FoodAllergiesDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['recipeFoodAllergies']
  >;

  export type RecipeFoodAllergiesSelectScalar = {
    id?: boolean;
    recipe_id?: boolean;
    food_allergy_id?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    deleted_at?: boolean;
  };

  export type RecipeFoodAllergiesOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'recipe_id'
    | 'food_allergy_id'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at',
    ExtArgs['result']['recipeFoodAllergies']
  >;
  export type RecipeFoodAllergiesInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
    food_allergy?: boolean | FoodAllergiesDefaultArgs<ExtArgs>;
  };
  export type RecipeFoodAllergiesIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
    food_allergy?: boolean | FoodAllergiesDefaultArgs<ExtArgs>;
  };
  export type RecipeFoodAllergiesIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    recipe?: boolean | RecipesDefaultArgs<ExtArgs>;
    food_allergy?: boolean | FoodAllergiesDefaultArgs<ExtArgs>;
  };

  export type $RecipeFoodAllergiesPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'RecipeFoodAllergies';
    objects: {
      recipe: Prisma.$RecipesPayload<ExtArgs>;
      food_allergy: Prisma.$FoodAllergiesPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: number;
        recipe_id: number;
        food_allergy_id: number;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
      },
      ExtArgs['result']['recipeFoodAllergies']
    >;
    composites: {};
  };

  type RecipeFoodAllergiesGetPayload<
    S extends boolean | null | undefined | RecipeFoodAllergiesDefaultArgs,
  > = $Result.GetResult<Prisma.$RecipeFoodAllergiesPayload, S>;

  type RecipeFoodAllergiesCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    RecipeFoodAllergiesFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: RecipeFoodAllergiesCountAggregateInputType | true;
  };

  export interface RecipeFoodAllergiesDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['RecipeFoodAllergies'];
      meta: { name: 'RecipeFoodAllergies' };
    };
    /**
     * Find zero or one RecipeFoodAllergies that matches the filter.
     * @param {RecipeFoodAllergiesFindUniqueArgs} args - Arguments to find a RecipeFoodAllergies
     * @example
     * // Get one RecipeFoodAllergies
     * const recipeFoodAllergies = await prisma.recipeFoodAllergies.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeFoodAllergiesFindUniqueArgs>(
      args: SelectSubset<T, RecipeFoodAllergiesFindUniqueArgs<ExtArgs>>,
    ): Prisma__RecipeFoodAllergiesClient<
      $Result.GetResult<
        Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one RecipeFoodAllergies that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipeFoodAllergiesFindUniqueOrThrowArgs} args - Arguments to find a RecipeFoodAllergies
     * @example
     * // Get one RecipeFoodAllergies
     * const recipeFoodAllergies = await prisma.recipeFoodAllergies.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeFoodAllergiesFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RecipeFoodAllergiesFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__RecipeFoodAllergiesClient<
      $Result.GetResult<
        Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first RecipeFoodAllergies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFoodAllergiesFindFirstArgs} args - Arguments to find a RecipeFoodAllergies
     * @example
     * // Get one RecipeFoodAllergies
     * const recipeFoodAllergies = await prisma.recipeFoodAllergies.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeFoodAllergiesFindFirstArgs>(
      args?: SelectSubset<T, RecipeFoodAllergiesFindFirstArgs<ExtArgs>>,
    ): Prisma__RecipeFoodAllergiesClient<
      $Result.GetResult<
        Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first RecipeFoodAllergies that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFoodAllergiesFindFirstOrThrowArgs} args - Arguments to find a RecipeFoodAllergies
     * @example
     * // Get one RecipeFoodAllergies
     * const recipeFoodAllergies = await prisma.recipeFoodAllergies.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeFoodAllergiesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RecipeFoodAllergiesFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__RecipeFoodAllergiesClient<
      $Result.GetResult<
        Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more RecipeFoodAllergies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFoodAllergiesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecipeFoodAllergies
     * const recipeFoodAllergies = await prisma.recipeFoodAllergies.findMany()
     *
     * // Get first 10 RecipeFoodAllergies
     * const recipeFoodAllergies = await prisma.recipeFoodAllergies.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const recipeFoodAllergiesWithIdOnly = await prisma.recipeFoodAllergies.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RecipeFoodAllergiesFindManyArgs>(
      args?: SelectSubset<T, RecipeFoodAllergiesFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a RecipeFoodAllergies.
     * @param {RecipeFoodAllergiesCreateArgs} args - Arguments to create a RecipeFoodAllergies.
     * @example
     * // Create one RecipeFoodAllergies
     * const RecipeFoodAllergies = await prisma.recipeFoodAllergies.create({
     *   data: {
     *     // ... data to create a RecipeFoodAllergies
     *   }
     * })
     *
     */
    create<T extends RecipeFoodAllergiesCreateArgs>(
      args: SelectSubset<T, RecipeFoodAllergiesCreateArgs<ExtArgs>>,
    ): Prisma__RecipeFoodAllergiesClient<
      $Result.GetResult<
        Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many RecipeFoodAllergies.
     * @param {RecipeFoodAllergiesCreateManyArgs} args - Arguments to create many RecipeFoodAllergies.
     * @example
     * // Create many RecipeFoodAllergies
     * const recipeFoodAllergies = await prisma.recipeFoodAllergies.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RecipeFoodAllergiesCreateManyArgs>(
      args?: SelectSubset<T, RecipeFoodAllergiesCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many RecipeFoodAllergies and returns the data saved in the database.
     * @param {RecipeFoodAllergiesCreateManyAndReturnArgs} args - Arguments to create many RecipeFoodAllergies.
     * @example
     * // Create many RecipeFoodAllergies
     * const recipeFoodAllergies = await prisma.recipeFoodAllergies.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RecipeFoodAllergies and only return the `id`
     * const recipeFoodAllergiesWithIdOnly = await prisma.recipeFoodAllergies.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RecipeFoodAllergiesCreateManyAndReturnArgs>(
      args?: SelectSubset<
        T,
        RecipeFoodAllergiesCreateManyAndReturnArgs<ExtArgs>
      >,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a RecipeFoodAllergies.
     * @param {RecipeFoodAllergiesDeleteArgs} args - Arguments to delete one RecipeFoodAllergies.
     * @example
     * // Delete one RecipeFoodAllergies
     * const RecipeFoodAllergies = await prisma.recipeFoodAllergies.delete({
     *   where: {
     *     // ... filter to delete one RecipeFoodAllergies
     *   }
     * })
     *
     */
    delete<T extends RecipeFoodAllergiesDeleteArgs>(
      args: SelectSubset<T, RecipeFoodAllergiesDeleteArgs<ExtArgs>>,
    ): Prisma__RecipeFoodAllergiesClient<
      $Result.GetResult<
        Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one RecipeFoodAllergies.
     * @param {RecipeFoodAllergiesUpdateArgs} args - Arguments to update one RecipeFoodAllergies.
     * @example
     * // Update one RecipeFoodAllergies
     * const recipeFoodAllergies = await prisma.recipeFoodAllergies.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RecipeFoodAllergiesUpdateArgs>(
      args: SelectSubset<T, RecipeFoodAllergiesUpdateArgs<ExtArgs>>,
    ): Prisma__RecipeFoodAllergiesClient<
      $Result.GetResult<
        Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more RecipeFoodAllergies.
     * @param {RecipeFoodAllergiesDeleteManyArgs} args - Arguments to filter RecipeFoodAllergies to delete.
     * @example
     * // Delete a few RecipeFoodAllergies
     * const { count } = await prisma.recipeFoodAllergies.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RecipeFoodAllergiesDeleteManyArgs>(
      args?: SelectSubset<T, RecipeFoodAllergiesDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more RecipeFoodAllergies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFoodAllergiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecipeFoodAllergies
     * const recipeFoodAllergies = await prisma.recipeFoodAllergies.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RecipeFoodAllergiesUpdateManyArgs>(
      args: SelectSubset<T, RecipeFoodAllergiesUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more RecipeFoodAllergies and returns the data updated in the database.
     * @param {RecipeFoodAllergiesUpdateManyAndReturnArgs} args - Arguments to update many RecipeFoodAllergies.
     * @example
     * // Update many RecipeFoodAllergies
     * const recipeFoodAllergies = await prisma.recipeFoodAllergies.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RecipeFoodAllergies and only return the `id`
     * const recipeFoodAllergiesWithIdOnly = await prisma.recipeFoodAllergies.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends RecipeFoodAllergiesUpdateManyAndReturnArgs>(
      args: SelectSubset<
        T,
        RecipeFoodAllergiesUpdateManyAndReturnArgs<ExtArgs>
      >,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one RecipeFoodAllergies.
     * @param {RecipeFoodAllergiesUpsertArgs} args - Arguments to update or create a RecipeFoodAllergies.
     * @example
     * // Update or create a RecipeFoodAllergies
     * const recipeFoodAllergies = await prisma.recipeFoodAllergies.upsert({
     *   create: {
     *     // ... data to create a RecipeFoodAllergies
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecipeFoodAllergies we want to update
     *   }
     * })
     */
    upsert<T extends RecipeFoodAllergiesUpsertArgs>(
      args: SelectSubset<T, RecipeFoodAllergiesUpsertArgs<ExtArgs>>,
    ): Prisma__RecipeFoodAllergiesClient<
      $Result.GetResult<
        Prisma.$RecipeFoodAllergiesPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of RecipeFoodAllergies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFoodAllergiesCountArgs} args - Arguments to filter RecipeFoodAllergies to count.
     * @example
     * // Count the number of RecipeFoodAllergies
     * const count = await prisma.recipeFoodAllergies.count({
     *   where: {
     *     // ... the filter for the RecipeFoodAllergies we want to count
     *   }
     * })
     **/
    count<T extends RecipeFoodAllergiesCountArgs>(
      args?: Subset<T, RecipeFoodAllergiesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<
              T['select'],
              RecipeFoodAllergiesCountAggregateOutputType
            >
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a RecipeFoodAllergies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFoodAllergiesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends RecipeFoodAllergiesAggregateArgs>(
      args: Subset<T, RecipeFoodAllergiesAggregateArgs>,
    ): Prisma.PrismaPromise<GetRecipeFoodAllergiesAggregateType<T>>;

    /**
     * Group by RecipeFoodAllergies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFoodAllergiesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends RecipeFoodAllergiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeFoodAllergiesGroupByArgs['orderBy'] }
        : { orderBy?: RecipeFoodAllergiesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, RecipeFoodAllergiesGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetRecipeFoodAllergiesGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RecipeFoodAllergies model
     */
    readonly fields: RecipeFoodAllergiesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecipeFoodAllergies.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeFoodAllergiesClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    recipe<T extends RecipesDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, RecipesDefaultArgs<ExtArgs>>,
    ): Prisma__RecipesClient<
      | $Result.GetResult<
          Prisma.$RecipesPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    food_allergy<T extends FoodAllergiesDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, FoodAllergiesDefaultArgs<ExtArgs>>,
    ): Prisma__FoodAllergiesClient<
      | $Result.GetResult<
          Prisma.$FoodAllergiesPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the RecipeFoodAllergies model
   */
  interface RecipeFoodAllergiesFieldRefs {
    readonly id: FieldRef<'RecipeFoodAllergies', 'Int'>;
    readonly recipe_id: FieldRef<'RecipeFoodAllergies', 'Int'>;
    readonly food_allergy_id: FieldRef<'RecipeFoodAllergies', 'Int'>;
    readonly created_at: FieldRef<'RecipeFoodAllergies', 'DateTime'>;
    readonly updated_at: FieldRef<'RecipeFoodAllergies', 'DateTime'>;
    readonly deleted_at: FieldRef<'RecipeFoodAllergies', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * RecipeFoodAllergies findUnique
   */
  export type RecipeFoodAllergiesFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesInclude<ExtArgs> | null;
    /**
     * Filter, which RecipeFoodAllergies to fetch.
     */
    where: RecipeFoodAllergiesWhereUniqueInput;
  };

  /**
   * RecipeFoodAllergies findUniqueOrThrow
   */
  export type RecipeFoodAllergiesFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesInclude<ExtArgs> | null;
    /**
     * Filter, which RecipeFoodAllergies to fetch.
     */
    where: RecipeFoodAllergiesWhereUniqueInput;
  };

  /**
   * RecipeFoodAllergies findFirst
   */
  export type RecipeFoodAllergiesFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesInclude<ExtArgs> | null;
    /**
     * Filter, which RecipeFoodAllergies to fetch.
     */
    where?: RecipeFoodAllergiesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RecipeFoodAllergies to fetch.
     */
    orderBy?:
      | RecipeFoodAllergiesOrderByWithRelationInput
      | RecipeFoodAllergiesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RecipeFoodAllergies.
     */
    cursor?: RecipeFoodAllergiesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RecipeFoodAllergies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RecipeFoodAllergies.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RecipeFoodAllergies.
     */
    distinct?:
      | RecipeFoodAllergiesScalarFieldEnum
      | RecipeFoodAllergiesScalarFieldEnum[];
  };

  /**
   * RecipeFoodAllergies findFirstOrThrow
   */
  export type RecipeFoodAllergiesFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesInclude<ExtArgs> | null;
    /**
     * Filter, which RecipeFoodAllergies to fetch.
     */
    where?: RecipeFoodAllergiesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RecipeFoodAllergies to fetch.
     */
    orderBy?:
      | RecipeFoodAllergiesOrderByWithRelationInput
      | RecipeFoodAllergiesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RecipeFoodAllergies.
     */
    cursor?: RecipeFoodAllergiesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RecipeFoodAllergies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RecipeFoodAllergies.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RecipeFoodAllergies.
     */
    distinct?:
      | RecipeFoodAllergiesScalarFieldEnum
      | RecipeFoodAllergiesScalarFieldEnum[];
  };

  /**
   * RecipeFoodAllergies findMany
   */
  export type RecipeFoodAllergiesFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesInclude<ExtArgs> | null;
    /**
     * Filter, which RecipeFoodAllergies to fetch.
     */
    where?: RecipeFoodAllergiesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RecipeFoodAllergies to fetch.
     */
    orderBy?:
      | RecipeFoodAllergiesOrderByWithRelationInput
      | RecipeFoodAllergiesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RecipeFoodAllergies.
     */
    cursor?: RecipeFoodAllergiesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RecipeFoodAllergies from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RecipeFoodAllergies.
     */
    skip?: number;
    distinct?:
      | RecipeFoodAllergiesScalarFieldEnum
      | RecipeFoodAllergiesScalarFieldEnum[];
  };

  /**
   * RecipeFoodAllergies create
   */
  export type RecipeFoodAllergiesCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesInclude<ExtArgs> | null;
    /**
     * The data needed to create a RecipeFoodAllergies.
     */
    data: XOR<
      RecipeFoodAllergiesCreateInput,
      RecipeFoodAllergiesUncheckedCreateInput
    >;
  };

  /**
   * RecipeFoodAllergies createMany
   */
  export type RecipeFoodAllergiesCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many RecipeFoodAllergies.
     */
    data:
      | RecipeFoodAllergiesCreateManyInput
      | RecipeFoodAllergiesCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * RecipeFoodAllergies createManyAndReturn
   */
  export type RecipeFoodAllergiesCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * The data used to create many RecipeFoodAllergies.
     */
    data:
      | RecipeFoodAllergiesCreateManyInput
      | RecipeFoodAllergiesCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * RecipeFoodAllergies update
   */
  export type RecipeFoodAllergiesUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesInclude<ExtArgs> | null;
    /**
     * The data needed to update a RecipeFoodAllergies.
     */
    data: XOR<
      RecipeFoodAllergiesUpdateInput,
      RecipeFoodAllergiesUncheckedUpdateInput
    >;
    /**
     * Choose, which RecipeFoodAllergies to update.
     */
    where: RecipeFoodAllergiesWhereUniqueInput;
  };

  /**
   * RecipeFoodAllergies updateMany
   */
  export type RecipeFoodAllergiesUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update RecipeFoodAllergies.
     */
    data: XOR<
      RecipeFoodAllergiesUpdateManyMutationInput,
      RecipeFoodAllergiesUncheckedUpdateManyInput
    >;
    /**
     * Filter which RecipeFoodAllergies to update
     */
    where?: RecipeFoodAllergiesWhereInput;
    /**
     * Limit how many RecipeFoodAllergies to update.
     */
    limit?: number;
  };

  /**
   * RecipeFoodAllergies updateManyAndReturn
   */
  export type RecipeFoodAllergiesUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * The data used to update RecipeFoodAllergies.
     */
    data: XOR<
      RecipeFoodAllergiesUpdateManyMutationInput,
      RecipeFoodAllergiesUncheckedUpdateManyInput
    >;
    /**
     * Filter which RecipeFoodAllergies to update
     */
    where?: RecipeFoodAllergiesWhereInput;
    /**
     * Limit how many RecipeFoodAllergies to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * RecipeFoodAllergies upsert
   */
  export type RecipeFoodAllergiesUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesInclude<ExtArgs> | null;
    /**
     * The filter to search for the RecipeFoodAllergies to update in case it exists.
     */
    where: RecipeFoodAllergiesWhereUniqueInput;
    /**
     * In case the RecipeFoodAllergies found by the `where` argument doesn't exist, create a new RecipeFoodAllergies with this data.
     */
    create: XOR<
      RecipeFoodAllergiesCreateInput,
      RecipeFoodAllergiesUncheckedCreateInput
    >;
    /**
     * In case the RecipeFoodAllergies was found with the provided `where` argument, update it with this data.
     */
    update: XOR<
      RecipeFoodAllergiesUpdateInput,
      RecipeFoodAllergiesUncheckedUpdateInput
    >;
  };

  /**
   * RecipeFoodAllergies delete
   */
  export type RecipeFoodAllergiesDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesInclude<ExtArgs> | null;
    /**
     * Filter which RecipeFoodAllergies to delete.
     */
    where: RecipeFoodAllergiesWhereUniqueInput;
  };

  /**
   * RecipeFoodAllergies deleteMany
   */
  export type RecipeFoodAllergiesDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RecipeFoodAllergies to delete
     */
    where?: RecipeFoodAllergiesWhereInput;
    /**
     * Limit how many RecipeFoodAllergies to delete.
     */
    limit?: number;
  };

  /**
   * RecipeFoodAllergies without action
   */
  export type RecipeFoodAllergiesDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RecipeFoodAllergies
     */
    select?: RecipeFoodAllergiesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RecipeFoodAllergies
     */
    omit?: RecipeFoodAllergiesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFoodAllergiesInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const RecipesScalarFieldEnum: {
    id: 'id';
    title: 'title';
    cooking_time: 'cooking_time';
    cooking_temperature: 'cooking_temperature';
    servings: 'servings';
    mold_type: 'mold_type';
    mold_size: 'mold_size';
    created_at: 'created_at';
    updated_at: 'updated_at';
    deleted_at: 'deleted_at';
  };

  export type RecipesScalarFieldEnum =
    (typeof RecipesScalarFieldEnum)[keyof typeof RecipesScalarFieldEnum];

  export const IngredientsScalarFieldEnum: {
    id: 'id';
    recipe_id: 'recipe_id';
    subrecipe_title: 'subrecipe_title';
    name: 'name';
    amount: 'amount';
    unit: 'unit';
    created_at: 'created_at';
    updated_at: 'updated_at';
    deleted_at: 'deleted_at';
  };

  export type IngredientsScalarFieldEnum =
    (typeof IngredientsScalarFieldEnum)[keyof typeof IngredientsScalarFieldEnum];

  export const InstructionsScalarFieldEnum: {
    id: 'id';
    recipe_id: 'recipe_id';
    subrecipe_title: 'subrecipe_title';
    body: 'body';
    created_at: 'created_at';
    updated_at: 'updated_at';
    deleted_at: 'deleted_at';
  };

  export type InstructionsScalarFieldEnum =
    (typeof InstructionsScalarFieldEnum)[keyof typeof InstructionsScalarFieldEnum];

  export const FoodAllergiesScalarFieldEnum: {
    id: 'id';
    name: 'name';
    created_at: 'created_at';
    updated_at: 'updated_at';
    deleted_at: 'deleted_at';
  };

  export type FoodAllergiesScalarFieldEnum =
    (typeof FoodAllergiesScalarFieldEnum)[keyof typeof FoodAllergiesScalarFieldEnum];

  export const RecipeFoodAllergiesScalarFieldEnum: {
    id: 'id';
    recipe_id: 'recipe_id';
    food_allergy_id: 'food_allergy_id';
    created_at: 'created_at';
    updated_at: 'updated_at';
    deleted_at: 'deleted_at';
  };

  export type RecipeFoodAllergiesScalarFieldEnum =
    (typeof RecipeFoodAllergiesScalarFieldEnum)[keyof typeof RecipeFoodAllergiesScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int'
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int[]'
  >;

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String'
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String[]'
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime'
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float'
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float[]'
  >;

  /**
   * Deep Input Types
   */

  export type RecipesWhereInput = {
    AND?: RecipesWhereInput | RecipesWhereInput[];
    OR?: RecipesWhereInput[];
    NOT?: RecipesWhereInput | RecipesWhereInput[];
    id?: IntFilter<'Recipes'> | number;
    title?: StringFilter<'Recipes'> | string;
    cooking_time?: StringNullableFilter<'Recipes'> | string | null;
    cooking_temperature?: IntNullableFilter<'Recipes'> | number | null;
    servings?: StringNullableFilter<'Recipes'> | string | null;
    mold_type?: StringNullableFilter<'Recipes'> | string | null;
    mold_size?: StringNullableFilter<'Recipes'> | string | null;
    created_at?: DateTimeFilter<'Recipes'> | Date | string;
    updated_at?: DateTimeFilter<'Recipes'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'Recipes'> | Date | string | null;
    ingredients?: IngredientsListRelationFilter;
    instructions?: InstructionsListRelationFilter;
    recipe_food_allergies?: RecipeFoodAllergiesListRelationFilter;
  };

  export type RecipesOrderByWithRelationInput = {
    id?: SortOrder;
    title?: SortOrder;
    cooking_time?: SortOrderInput | SortOrder;
    cooking_temperature?: SortOrderInput | SortOrder;
    servings?: SortOrderInput | SortOrder;
    mold_type?: SortOrderInput | SortOrder;
    mold_size?: SortOrderInput | SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    ingredients?: IngredientsOrderByRelationAggregateInput;
    instructions?: InstructionsOrderByRelationAggregateInput;
    recipe_food_allergies?: RecipeFoodAllergiesOrderByRelationAggregateInput;
  };

  export type RecipesWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: RecipesWhereInput | RecipesWhereInput[];
      OR?: RecipesWhereInput[];
      NOT?: RecipesWhereInput | RecipesWhereInput[];
      title?: StringFilter<'Recipes'> | string;
      cooking_time?: StringNullableFilter<'Recipes'> | string | null;
      cooking_temperature?: IntNullableFilter<'Recipes'> | number | null;
      servings?: StringNullableFilter<'Recipes'> | string | null;
      mold_type?: StringNullableFilter<'Recipes'> | string | null;
      mold_size?: StringNullableFilter<'Recipes'> | string | null;
      created_at?: DateTimeFilter<'Recipes'> | Date | string;
      updated_at?: DateTimeFilter<'Recipes'> | Date | string;
      deleted_at?: DateTimeNullableFilter<'Recipes'> | Date | string | null;
      ingredients?: IngredientsListRelationFilter;
      instructions?: InstructionsListRelationFilter;
      recipe_food_allergies?: RecipeFoodAllergiesListRelationFilter;
    },
    'id'
  >;

  export type RecipesOrderByWithAggregationInput = {
    id?: SortOrder;
    title?: SortOrder;
    cooking_time?: SortOrderInput | SortOrder;
    cooking_temperature?: SortOrderInput | SortOrder;
    servings?: SortOrderInput | SortOrder;
    mold_type?: SortOrderInput | SortOrder;
    mold_size?: SortOrderInput | SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    _count?: RecipesCountOrderByAggregateInput;
    _avg?: RecipesAvgOrderByAggregateInput;
    _max?: RecipesMaxOrderByAggregateInput;
    _min?: RecipesMinOrderByAggregateInput;
    _sum?: RecipesSumOrderByAggregateInput;
  };

  export type RecipesScalarWhereWithAggregatesInput = {
    AND?:
      | RecipesScalarWhereWithAggregatesInput
      | RecipesScalarWhereWithAggregatesInput[];
    OR?: RecipesScalarWhereWithAggregatesInput[];
    NOT?:
      | RecipesScalarWhereWithAggregatesInput
      | RecipesScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Recipes'> | number;
    title?: StringWithAggregatesFilter<'Recipes'> | string;
    cooking_time?:
      | StringNullableWithAggregatesFilter<'Recipes'>
      | string
      | null;
    cooking_temperature?:
      | IntNullableWithAggregatesFilter<'Recipes'>
      | number
      | null;
    servings?: StringNullableWithAggregatesFilter<'Recipes'> | string | null;
    mold_type?: StringNullableWithAggregatesFilter<'Recipes'> | string | null;
    mold_size?: StringNullableWithAggregatesFilter<'Recipes'> | string | null;
    created_at?: DateTimeWithAggregatesFilter<'Recipes'> | Date | string;
    updated_at?: DateTimeWithAggregatesFilter<'Recipes'> | Date | string;
    deleted_at?:
      | DateTimeNullableWithAggregatesFilter<'Recipes'>
      | Date
      | string
      | null;
  };

  export type IngredientsWhereInput = {
    AND?: IngredientsWhereInput | IngredientsWhereInput[];
    OR?: IngredientsWhereInput[];
    NOT?: IngredientsWhereInput | IngredientsWhereInput[];
    id?: IntFilter<'Ingredients'> | number;
    recipe_id?: IntFilter<'Ingredients'> | number;
    subrecipe_title?: StringNullableFilter<'Ingredients'> | string | null;
    name?: StringFilter<'Ingredients'> | string;
    amount?: StringNullableFilter<'Ingredients'> | string | null;
    unit?: StringNullableFilter<'Ingredients'> | string | null;
    created_at?: DateTimeFilter<'Ingredients'> | Date | string;
    updated_at?: DateTimeFilter<'Ingredients'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'Ingredients'> | Date | string | null;
    recipe?: XOR<RecipesScalarRelationFilter, RecipesWhereInput>;
  };

  export type IngredientsOrderByWithRelationInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    subrecipe_title?: SortOrderInput | SortOrder;
    name?: SortOrder;
    amount?: SortOrderInput | SortOrder;
    unit?: SortOrderInput | SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    recipe?: RecipesOrderByWithRelationInput;
  };

  export type IngredientsWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: IngredientsWhereInput | IngredientsWhereInput[];
      OR?: IngredientsWhereInput[];
      NOT?: IngredientsWhereInput | IngredientsWhereInput[];
      recipe_id?: IntFilter<'Ingredients'> | number;
      subrecipe_title?: StringNullableFilter<'Ingredients'> | string | null;
      name?: StringFilter<'Ingredients'> | string;
      amount?: StringNullableFilter<'Ingredients'> | string | null;
      unit?: StringNullableFilter<'Ingredients'> | string | null;
      created_at?: DateTimeFilter<'Ingredients'> | Date | string;
      updated_at?: DateTimeFilter<'Ingredients'> | Date | string;
      deleted_at?: DateTimeNullableFilter<'Ingredients'> | Date | string | null;
      recipe?: XOR<RecipesScalarRelationFilter, RecipesWhereInput>;
    },
    'id'
  >;

  export type IngredientsOrderByWithAggregationInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    subrecipe_title?: SortOrderInput | SortOrder;
    name?: SortOrder;
    amount?: SortOrderInput | SortOrder;
    unit?: SortOrderInput | SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    _count?: IngredientsCountOrderByAggregateInput;
    _avg?: IngredientsAvgOrderByAggregateInput;
    _max?: IngredientsMaxOrderByAggregateInput;
    _min?: IngredientsMinOrderByAggregateInput;
    _sum?: IngredientsSumOrderByAggregateInput;
  };

  export type IngredientsScalarWhereWithAggregatesInput = {
    AND?:
      | IngredientsScalarWhereWithAggregatesInput
      | IngredientsScalarWhereWithAggregatesInput[];
    OR?: IngredientsScalarWhereWithAggregatesInput[];
    NOT?:
      | IngredientsScalarWhereWithAggregatesInput
      | IngredientsScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Ingredients'> | number;
    recipe_id?: IntWithAggregatesFilter<'Ingredients'> | number;
    subrecipe_title?:
      | StringNullableWithAggregatesFilter<'Ingredients'>
      | string
      | null;
    name?: StringWithAggregatesFilter<'Ingredients'> | string;
    amount?: StringNullableWithAggregatesFilter<'Ingredients'> | string | null;
    unit?: StringNullableWithAggregatesFilter<'Ingredients'> | string | null;
    created_at?: DateTimeWithAggregatesFilter<'Ingredients'> | Date | string;
    updated_at?: DateTimeWithAggregatesFilter<'Ingredients'> | Date | string;
    deleted_at?:
      | DateTimeNullableWithAggregatesFilter<'Ingredients'>
      | Date
      | string
      | null;
  };

  export type InstructionsWhereInput = {
    AND?: InstructionsWhereInput | InstructionsWhereInput[];
    OR?: InstructionsWhereInput[];
    NOT?: InstructionsWhereInput | InstructionsWhereInput[];
    id?: IntFilter<'Instructions'> | number;
    recipe_id?: IntFilter<'Instructions'> | number;
    subrecipe_title?: StringNullableFilter<'Instructions'> | string | null;
    body?: StringFilter<'Instructions'> | string;
    created_at?: DateTimeFilter<'Instructions'> | Date | string;
    updated_at?: DateTimeFilter<'Instructions'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'Instructions'> | Date | string | null;
    recipe?: XOR<RecipesScalarRelationFilter, RecipesWhereInput>;
  };

  export type InstructionsOrderByWithRelationInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    subrecipe_title?: SortOrderInput | SortOrder;
    body?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    recipe?: RecipesOrderByWithRelationInput;
  };

  export type InstructionsWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: InstructionsWhereInput | InstructionsWhereInput[];
      OR?: InstructionsWhereInput[];
      NOT?: InstructionsWhereInput | InstructionsWhereInput[];
      recipe_id?: IntFilter<'Instructions'> | number;
      subrecipe_title?: StringNullableFilter<'Instructions'> | string | null;
      body?: StringFilter<'Instructions'> | string;
      created_at?: DateTimeFilter<'Instructions'> | Date | string;
      updated_at?: DateTimeFilter<'Instructions'> | Date | string;
      deleted_at?:
        | DateTimeNullableFilter<'Instructions'>
        | Date
        | string
        | null;
      recipe?: XOR<RecipesScalarRelationFilter, RecipesWhereInput>;
    },
    'id'
  >;

  export type InstructionsOrderByWithAggregationInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    subrecipe_title?: SortOrderInput | SortOrder;
    body?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    _count?: InstructionsCountOrderByAggregateInput;
    _avg?: InstructionsAvgOrderByAggregateInput;
    _max?: InstructionsMaxOrderByAggregateInput;
    _min?: InstructionsMinOrderByAggregateInput;
    _sum?: InstructionsSumOrderByAggregateInput;
  };

  export type InstructionsScalarWhereWithAggregatesInput = {
    AND?:
      | InstructionsScalarWhereWithAggregatesInput
      | InstructionsScalarWhereWithAggregatesInput[];
    OR?: InstructionsScalarWhereWithAggregatesInput[];
    NOT?:
      | InstructionsScalarWhereWithAggregatesInput
      | InstructionsScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'Instructions'> | number;
    recipe_id?: IntWithAggregatesFilter<'Instructions'> | number;
    subrecipe_title?:
      | StringNullableWithAggregatesFilter<'Instructions'>
      | string
      | null;
    body?: StringWithAggregatesFilter<'Instructions'> | string;
    created_at?: DateTimeWithAggregatesFilter<'Instructions'> | Date | string;
    updated_at?: DateTimeWithAggregatesFilter<'Instructions'> | Date | string;
    deleted_at?:
      | DateTimeNullableWithAggregatesFilter<'Instructions'>
      | Date
      | string
      | null;
  };

  export type FoodAllergiesWhereInput = {
    AND?: FoodAllergiesWhereInput | FoodAllergiesWhereInput[];
    OR?: FoodAllergiesWhereInput[];
    NOT?: FoodAllergiesWhereInput | FoodAllergiesWhereInput[];
    id?: IntFilter<'FoodAllergies'> | number;
    name?: StringFilter<'FoodAllergies'> | string;
    created_at?: DateTimeFilter<'FoodAllergies'> | Date | string;
    updated_at?: DateTimeFilter<'FoodAllergies'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'FoodAllergies'> | Date | string | null;
    recipe_food_allergies?: RecipeFoodAllergiesListRelationFilter;
  };

  export type FoodAllergiesOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    recipe_food_allergies?: RecipeFoodAllergiesOrderByRelationAggregateInput;
  };

  export type FoodAllergiesWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: FoodAllergiesWhereInput | FoodAllergiesWhereInput[];
      OR?: FoodAllergiesWhereInput[];
      NOT?: FoodAllergiesWhereInput | FoodAllergiesWhereInput[];
      name?: StringFilter<'FoodAllergies'> | string;
      created_at?: DateTimeFilter<'FoodAllergies'> | Date | string;
      updated_at?: DateTimeFilter<'FoodAllergies'> | Date | string;
      deleted_at?:
        | DateTimeNullableFilter<'FoodAllergies'>
        | Date
        | string
        | null;
      recipe_food_allergies?: RecipeFoodAllergiesListRelationFilter;
    },
    'id'
  >;

  export type FoodAllergiesOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    _count?: FoodAllergiesCountOrderByAggregateInput;
    _avg?: FoodAllergiesAvgOrderByAggregateInput;
    _max?: FoodAllergiesMaxOrderByAggregateInput;
    _min?: FoodAllergiesMinOrderByAggregateInput;
    _sum?: FoodAllergiesSumOrderByAggregateInput;
  };

  export type FoodAllergiesScalarWhereWithAggregatesInput = {
    AND?:
      | FoodAllergiesScalarWhereWithAggregatesInput
      | FoodAllergiesScalarWhereWithAggregatesInput[];
    OR?: FoodAllergiesScalarWhereWithAggregatesInput[];
    NOT?:
      | FoodAllergiesScalarWhereWithAggregatesInput
      | FoodAllergiesScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'FoodAllergies'> | number;
    name?: StringWithAggregatesFilter<'FoodAllergies'> | string;
    created_at?: DateTimeWithAggregatesFilter<'FoodAllergies'> | Date | string;
    updated_at?: DateTimeWithAggregatesFilter<'FoodAllergies'> | Date | string;
    deleted_at?:
      | DateTimeNullableWithAggregatesFilter<'FoodAllergies'>
      | Date
      | string
      | null;
  };

  export type RecipeFoodAllergiesWhereInput = {
    AND?: RecipeFoodAllergiesWhereInput | RecipeFoodAllergiesWhereInput[];
    OR?: RecipeFoodAllergiesWhereInput[];
    NOT?: RecipeFoodAllergiesWhereInput | RecipeFoodAllergiesWhereInput[];
    id?: IntFilter<'RecipeFoodAllergies'> | number;
    recipe_id?: IntFilter<'RecipeFoodAllergies'> | number;
    food_allergy_id?: IntFilter<'RecipeFoodAllergies'> | number;
    created_at?: DateTimeFilter<'RecipeFoodAllergies'> | Date | string;
    updated_at?: DateTimeFilter<'RecipeFoodAllergies'> | Date | string;
    deleted_at?:
      | DateTimeNullableFilter<'RecipeFoodAllergies'>
      | Date
      | string
      | null;
    recipe?: XOR<RecipesScalarRelationFilter, RecipesWhereInput>;
    food_allergy?: XOR<
      FoodAllergiesScalarRelationFilter,
      FoodAllergiesWhereInput
    >;
  };

  export type RecipeFoodAllergiesOrderByWithRelationInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    food_allergy_id?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    recipe?: RecipesOrderByWithRelationInput;
    food_allergy?: FoodAllergiesOrderByWithRelationInput;
  };

  export type RecipeFoodAllergiesWhereUniqueInput = Prisma.AtLeast<
    {
      id?: number;
      AND?: RecipeFoodAllergiesWhereInput | RecipeFoodAllergiesWhereInput[];
      OR?: RecipeFoodAllergiesWhereInput[];
      NOT?: RecipeFoodAllergiesWhereInput | RecipeFoodAllergiesWhereInput[];
      recipe_id?: IntFilter<'RecipeFoodAllergies'> | number;
      food_allergy_id?: IntFilter<'RecipeFoodAllergies'> | number;
      created_at?: DateTimeFilter<'RecipeFoodAllergies'> | Date | string;
      updated_at?: DateTimeFilter<'RecipeFoodAllergies'> | Date | string;
      deleted_at?:
        | DateTimeNullableFilter<'RecipeFoodAllergies'>
        | Date
        | string
        | null;
      recipe?: XOR<RecipesScalarRelationFilter, RecipesWhereInput>;
      food_allergy?: XOR<
        FoodAllergiesScalarRelationFilter,
        FoodAllergiesWhereInput
      >;
    },
    'id'
  >;

  export type RecipeFoodAllergiesOrderByWithAggregationInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    food_allergy_id?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrderInput | SortOrder;
    _count?: RecipeFoodAllergiesCountOrderByAggregateInput;
    _avg?: RecipeFoodAllergiesAvgOrderByAggregateInput;
    _max?: RecipeFoodAllergiesMaxOrderByAggregateInput;
    _min?: RecipeFoodAllergiesMinOrderByAggregateInput;
    _sum?: RecipeFoodAllergiesSumOrderByAggregateInput;
  };

  export type RecipeFoodAllergiesScalarWhereWithAggregatesInput = {
    AND?:
      | RecipeFoodAllergiesScalarWhereWithAggregatesInput
      | RecipeFoodAllergiesScalarWhereWithAggregatesInput[];
    OR?: RecipeFoodAllergiesScalarWhereWithAggregatesInput[];
    NOT?:
      | RecipeFoodAllergiesScalarWhereWithAggregatesInput
      | RecipeFoodAllergiesScalarWhereWithAggregatesInput[];
    id?: IntWithAggregatesFilter<'RecipeFoodAllergies'> | number;
    recipe_id?: IntWithAggregatesFilter<'RecipeFoodAllergies'> | number;
    food_allergy_id?: IntWithAggregatesFilter<'RecipeFoodAllergies'> | number;
    created_at?:
      | DateTimeWithAggregatesFilter<'RecipeFoodAllergies'>
      | Date
      | string;
    updated_at?:
      | DateTimeWithAggregatesFilter<'RecipeFoodAllergies'>
      | Date
      | string;
    deleted_at?:
      | DateTimeNullableWithAggregatesFilter<'RecipeFoodAllergies'>
      | Date
      | string
      | null;
  };

  export type RecipesCreateInput = {
    title: string;
    cooking_time?: string | null;
    cooking_temperature?: number | null;
    servings?: string | null;
    mold_type?: string | null;
    mold_size?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    ingredients?: IngredientsCreateNestedManyWithoutRecipeInput;
    instructions?: InstructionsCreateNestedManyWithoutRecipeInput;
    recipe_food_allergies?: RecipeFoodAllergiesCreateNestedManyWithoutRecipeInput;
  };

  export type RecipesUncheckedCreateInput = {
    id?: number;
    title: string;
    cooking_time?: string | null;
    cooking_temperature?: number | null;
    servings?: string | null;
    mold_type?: string | null;
    mold_size?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    ingredients?: IngredientsUncheckedCreateNestedManyWithoutRecipeInput;
    instructions?: InstructionsUncheckedCreateNestedManyWithoutRecipeInput;
    recipe_food_allergies?: RecipeFoodAllergiesUncheckedCreateNestedManyWithoutRecipeInput;
  };

  export type RecipesUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string;
    cooking_time?: NullableStringFieldUpdateOperationsInput | string | null;
    cooking_temperature?: NullableIntFieldUpdateOperationsInput | number | null;
    servings?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_type?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_size?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    ingredients?: IngredientsUpdateManyWithoutRecipeNestedInput;
    instructions?: InstructionsUpdateManyWithoutRecipeNestedInput;
    recipe_food_allergies?: RecipeFoodAllergiesUpdateManyWithoutRecipeNestedInput;
  };

  export type RecipesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    cooking_time?: NullableStringFieldUpdateOperationsInput | string | null;
    cooking_temperature?: NullableIntFieldUpdateOperationsInput | number | null;
    servings?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_type?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_size?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    ingredients?: IngredientsUncheckedUpdateManyWithoutRecipeNestedInput;
    instructions?: InstructionsUncheckedUpdateManyWithoutRecipeNestedInput;
    recipe_food_allergies?: RecipeFoodAllergiesUncheckedUpdateManyWithoutRecipeNestedInput;
  };

  export type RecipesCreateManyInput = {
    id?: number;
    title: string;
    cooking_time?: string | null;
    cooking_temperature?: number | null;
    servings?: string | null;
    mold_type?: string | null;
    mold_size?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type RecipesUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string;
    cooking_time?: NullableStringFieldUpdateOperationsInput | string | null;
    cooking_temperature?: NullableIntFieldUpdateOperationsInput | number | null;
    servings?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_type?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_size?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type RecipesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    cooking_time?: NullableStringFieldUpdateOperationsInput | string | null;
    cooking_temperature?: NullableIntFieldUpdateOperationsInput | number | null;
    servings?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_type?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_size?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type IngredientsCreateInput = {
    subrecipe_title?: string | null;
    name: string;
    amount?: string | null;
    unit?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    recipe: RecipesCreateNestedOneWithoutIngredientsInput;
  };

  export type IngredientsUncheckedCreateInput = {
    id?: number;
    recipe_id: number;
    subrecipe_title?: string | null;
    name: string;
    amount?: string | null;
    unit?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type IngredientsUpdateInput = {
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    amount?: NullableStringFieldUpdateOperationsInput | string | null;
    unit?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    recipe?: RecipesUpdateOneRequiredWithoutIngredientsNestedInput;
  };

  export type IngredientsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    recipe_id?: IntFieldUpdateOperationsInput | number;
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    amount?: NullableStringFieldUpdateOperationsInput | string | null;
    unit?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type IngredientsCreateManyInput = {
    id?: number;
    recipe_id: number;
    subrecipe_title?: string | null;
    name: string;
    amount?: string | null;
    unit?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type IngredientsUpdateManyMutationInput = {
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    amount?: NullableStringFieldUpdateOperationsInput | string | null;
    unit?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type IngredientsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    recipe_id?: IntFieldUpdateOperationsInput | number;
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    amount?: NullableStringFieldUpdateOperationsInput | string | null;
    unit?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type InstructionsCreateInput = {
    subrecipe_title?: string | null;
    body: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    recipe: RecipesCreateNestedOneWithoutInstructionsInput;
  };

  export type InstructionsUncheckedCreateInput = {
    id?: number;
    recipe_id: number;
    subrecipe_title?: string | null;
    body: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type InstructionsUpdateInput = {
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    body?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    recipe?: RecipesUpdateOneRequiredWithoutInstructionsNestedInput;
  };

  export type InstructionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    recipe_id?: IntFieldUpdateOperationsInput | number;
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    body?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type InstructionsCreateManyInput = {
    id?: number;
    recipe_id: number;
    subrecipe_title?: string | null;
    body: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type InstructionsUpdateManyMutationInput = {
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    body?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type InstructionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    recipe_id?: IntFieldUpdateOperationsInput | number;
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    body?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type FoodAllergiesCreateInput = {
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    recipe_food_allergies?: RecipeFoodAllergiesCreateNestedManyWithoutFood_allergyInput;
  };

  export type FoodAllergiesUncheckedCreateInput = {
    id?: number;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    recipe_food_allergies?: RecipeFoodAllergiesUncheckedCreateNestedManyWithoutFood_allergyInput;
  };

  export type FoodAllergiesUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    recipe_food_allergies?: RecipeFoodAllergiesUpdateManyWithoutFood_allergyNestedInput;
  };

  export type FoodAllergiesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    recipe_food_allergies?: RecipeFoodAllergiesUncheckedUpdateManyWithoutFood_allergyNestedInput;
  };

  export type FoodAllergiesCreateManyInput = {
    id?: number;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type FoodAllergiesUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type FoodAllergiesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type RecipeFoodAllergiesCreateInput = {
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    recipe: RecipesCreateNestedOneWithoutRecipe_food_allergiesInput;
    food_allergy: FoodAllergiesCreateNestedOneWithoutRecipe_food_allergiesInput;
  };

  export type RecipeFoodAllergiesUncheckedCreateInput = {
    id?: number;
    recipe_id: number;
    food_allergy_id: number;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type RecipeFoodAllergiesUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    recipe?: RecipesUpdateOneRequiredWithoutRecipe_food_allergiesNestedInput;
    food_allergy?: FoodAllergiesUpdateOneRequiredWithoutRecipe_food_allergiesNestedInput;
  };

  export type RecipeFoodAllergiesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    recipe_id?: IntFieldUpdateOperationsInput | number;
    food_allergy_id?: IntFieldUpdateOperationsInput | number;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type RecipeFoodAllergiesCreateManyInput = {
    id?: number;
    recipe_id: number;
    food_allergy_id: number;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type RecipeFoodAllergiesUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type RecipeFoodAllergiesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    recipe_id?: IntFieldUpdateOperationsInput | number;
    food_allergy_id?: IntFieldUpdateOperationsInput | number;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type IngredientsListRelationFilter = {
    every?: IngredientsWhereInput;
    some?: IngredientsWhereInput;
    none?: IngredientsWhereInput;
  };

  export type InstructionsListRelationFilter = {
    every?: InstructionsWhereInput;
    some?: InstructionsWhereInput;
    none?: InstructionsWhereInput;
  };

  export type RecipeFoodAllergiesListRelationFilter = {
    every?: RecipeFoodAllergiesWhereInput;
    some?: RecipeFoodAllergiesWhereInput;
    none?: RecipeFoodAllergiesWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type IngredientsOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type InstructionsOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type RecipeFoodAllergiesOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type RecipesCountOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    cooking_time?: SortOrder;
    cooking_temperature?: SortOrder;
    servings?: SortOrder;
    mold_type?: SortOrder;
    mold_size?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type RecipesAvgOrderByAggregateInput = {
    id?: SortOrder;
    cooking_temperature?: SortOrder;
  };

  export type RecipesMaxOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    cooking_time?: SortOrder;
    cooking_temperature?: SortOrder;
    servings?: SortOrder;
    mold_type?: SortOrder;
    mold_size?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type RecipesMinOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    cooking_time?: SortOrder;
    cooking_temperature?: SortOrder;
    servings?: SortOrder;
    mold_type?: SortOrder;
    mold_size?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type RecipesSumOrderByAggregateInput = {
    id?: SortOrder;
    cooking_temperature?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type RecipesScalarRelationFilter = {
    is?: RecipesWhereInput;
    isNot?: RecipesWhereInput;
  };

  export type IngredientsCountOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    subrecipe_title?: SortOrder;
    name?: SortOrder;
    amount?: SortOrder;
    unit?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type IngredientsAvgOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
  };

  export type IngredientsMaxOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    subrecipe_title?: SortOrder;
    name?: SortOrder;
    amount?: SortOrder;
    unit?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type IngredientsMinOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    subrecipe_title?: SortOrder;
    name?: SortOrder;
    amount?: SortOrder;
    unit?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type IngredientsSumOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
  };

  export type InstructionsCountOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    subrecipe_title?: SortOrder;
    body?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type InstructionsAvgOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
  };

  export type InstructionsMaxOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    subrecipe_title?: SortOrder;
    body?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type InstructionsMinOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    subrecipe_title?: SortOrder;
    body?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type InstructionsSumOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
  };

  export type FoodAllergiesCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type FoodAllergiesAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type FoodAllergiesMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type FoodAllergiesMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type FoodAllergiesSumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type FoodAllergiesScalarRelationFilter = {
    is?: FoodAllergiesWhereInput;
    isNot?: FoodAllergiesWhereInput;
  };

  export type RecipeFoodAllergiesCountOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    food_allergy_id?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type RecipeFoodAllergiesAvgOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    food_allergy_id?: SortOrder;
  };

  export type RecipeFoodAllergiesMaxOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    food_allergy_id?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type RecipeFoodAllergiesMinOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    food_allergy_id?: SortOrder;
    created_at?: SortOrder;
    updated_at?: SortOrder;
    deleted_at?: SortOrder;
  };

  export type RecipeFoodAllergiesSumOrderByAggregateInput = {
    id?: SortOrder;
    recipe_id?: SortOrder;
    food_allergy_id?: SortOrder;
  };

  export type IngredientsCreateNestedManyWithoutRecipeInput = {
    create?:
      | XOR<
          IngredientsCreateWithoutRecipeInput,
          IngredientsUncheckedCreateWithoutRecipeInput
        >
      | IngredientsCreateWithoutRecipeInput[]
      | IngredientsUncheckedCreateWithoutRecipeInput[];
    connectOrCreate?:
      | IngredientsCreateOrConnectWithoutRecipeInput
      | IngredientsCreateOrConnectWithoutRecipeInput[];
    createMany?: IngredientsCreateManyRecipeInputEnvelope;
    connect?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[];
  };

  export type InstructionsCreateNestedManyWithoutRecipeInput = {
    create?:
      | XOR<
          InstructionsCreateWithoutRecipeInput,
          InstructionsUncheckedCreateWithoutRecipeInput
        >
      | InstructionsCreateWithoutRecipeInput[]
      | InstructionsUncheckedCreateWithoutRecipeInput[];
    connectOrCreate?:
      | InstructionsCreateOrConnectWithoutRecipeInput
      | InstructionsCreateOrConnectWithoutRecipeInput[];
    createMany?: InstructionsCreateManyRecipeInputEnvelope;
    connect?: InstructionsWhereUniqueInput | InstructionsWhereUniqueInput[];
  };

  export type RecipeFoodAllergiesCreateNestedManyWithoutRecipeInput = {
    create?:
      | XOR<
          RecipeFoodAllergiesCreateWithoutRecipeInput,
          RecipeFoodAllergiesUncheckedCreateWithoutRecipeInput
        >
      | RecipeFoodAllergiesCreateWithoutRecipeInput[]
      | RecipeFoodAllergiesUncheckedCreateWithoutRecipeInput[];
    connectOrCreate?:
      | RecipeFoodAllergiesCreateOrConnectWithoutRecipeInput
      | RecipeFoodAllergiesCreateOrConnectWithoutRecipeInput[];
    createMany?: RecipeFoodAllergiesCreateManyRecipeInputEnvelope;
    connect?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
  };

  export type IngredientsUncheckedCreateNestedManyWithoutRecipeInput = {
    create?:
      | XOR<
          IngredientsCreateWithoutRecipeInput,
          IngredientsUncheckedCreateWithoutRecipeInput
        >
      | IngredientsCreateWithoutRecipeInput[]
      | IngredientsUncheckedCreateWithoutRecipeInput[];
    connectOrCreate?:
      | IngredientsCreateOrConnectWithoutRecipeInput
      | IngredientsCreateOrConnectWithoutRecipeInput[];
    createMany?: IngredientsCreateManyRecipeInputEnvelope;
    connect?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[];
  };

  export type InstructionsUncheckedCreateNestedManyWithoutRecipeInput = {
    create?:
      | XOR<
          InstructionsCreateWithoutRecipeInput,
          InstructionsUncheckedCreateWithoutRecipeInput
        >
      | InstructionsCreateWithoutRecipeInput[]
      | InstructionsUncheckedCreateWithoutRecipeInput[];
    connectOrCreate?:
      | InstructionsCreateOrConnectWithoutRecipeInput
      | InstructionsCreateOrConnectWithoutRecipeInput[];
    createMany?: InstructionsCreateManyRecipeInputEnvelope;
    connect?: InstructionsWhereUniqueInput | InstructionsWhereUniqueInput[];
  };

  export type RecipeFoodAllergiesUncheckedCreateNestedManyWithoutRecipeInput = {
    create?:
      | XOR<
          RecipeFoodAllergiesCreateWithoutRecipeInput,
          RecipeFoodAllergiesUncheckedCreateWithoutRecipeInput
        >
      | RecipeFoodAllergiesCreateWithoutRecipeInput[]
      | RecipeFoodAllergiesUncheckedCreateWithoutRecipeInput[];
    connectOrCreate?:
      | RecipeFoodAllergiesCreateOrConnectWithoutRecipeInput
      | RecipeFoodAllergiesCreateOrConnectWithoutRecipeInput[];
    createMany?: RecipeFoodAllergiesCreateManyRecipeInputEnvelope;
    connect?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type IngredientsUpdateManyWithoutRecipeNestedInput = {
    create?:
      | XOR<
          IngredientsCreateWithoutRecipeInput,
          IngredientsUncheckedCreateWithoutRecipeInput
        >
      | IngredientsCreateWithoutRecipeInput[]
      | IngredientsUncheckedCreateWithoutRecipeInput[];
    connectOrCreate?:
      | IngredientsCreateOrConnectWithoutRecipeInput
      | IngredientsCreateOrConnectWithoutRecipeInput[];
    upsert?:
      | IngredientsUpsertWithWhereUniqueWithoutRecipeInput
      | IngredientsUpsertWithWhereUniqueWithoutRecipeInput[];
    createMany?: IngredientsCreateManyRecipeInputEnvelope;
    set?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[];
    disconnect?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[];
    delete?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[];
    connect?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[];
    update?:
      | IngredientsUpdateWithWhereUniqueWithoutRecipeInput
      | IngredientsUpdateWithWhereUniqueWithoutRecipeInput[];
    updateMany?:
      | IngredientsUpdateManyWithWhereWithoutRecipeInput
      | IngredientsUpdateManyWithWhereWithoutRecipeInput[];
    deleteMany?: IngredientsScalarWhereInput | IngredientsScalarWhereInput[];
  };

  export type InstructionsUpdateManyWithoutRecipeNestedInput = {
    create?:
      | XOR<
          InstructionsCreateWithoutRecipeInput,
          InstructionsUncheckedCreateWithoutRecipeInput
        >
      | InstructionsCreateWithoutRecipeInput[]
      | InstructionsUncheckedCreateWithoutRecipeInput[];
    connectOrCreate?:
      | InstructionsCreateOrConnectWithoutRecipeInput
      | InstructionsCreateOrConnectWithoutRecipeInput[];
    upsert?:
      | InstructionsUpsertWithWhereUniqueWithoutRecipeInput
      | InstructionsUpsertWithWhereUniqueWithoutRecipeInput[];
    createMany?: InstructionsCreateManyRecipeInputEnvelope;
    set?: InstructionsWhereUniqueInput | InstructionsWhereUniqueInput[];
    disconnect?: InstructionsWhereUniqueInput | InstructionsWhereUniqueInput[];
    delete?: InstructionsWhereUniqueInput | InstructionsWhereUniqueInput[];
    connect?: InstructionsWhereUniqueInput | InstructionsWhereUniqueInput[];
    update?:
      | InstructionsUpdateWithWhereUniqueWithoutRecipeInput
      | InstructionsUpdateWithWhereUniqueWithoutRecipeInput[];
    updateMany?:
      | InstructionsUpdateManyWithWhereWithoutRecipeInput
      | InstructionsUpdateManyWithWhereWithoutRecipeInput[];
    deleteMany?: InstructionsScalarWhereInput | InstructionsScalarWhereInput[];
  };

  export type RecipeFoodAllergiesUpdateManyWithoutRecipeNestedInput = {
    create?:
      | XOR<
          RecipeFoodAllergiesCreateWithoutRecipeInput,
          RecipeFoodAllergiesUncheckedCreateWithoutRecipeInput
        >
      | RecipeFoodAllergiesCreateWithoutRecipeInput[]
      | RecipeFoodAllergiesUncheckedCreateWithoutRecipeInput[];
    connectOrCreate?:
      | RecipeFoodAllergiesCreateOrConnectWithoutRecipeInput
      | RecipeFoodAllergiesCreateOrConnectWithoutRecipeInput[];
    upsert?:
      | RecipeFoodAllergiesUpsertWithWhereUniqueWithoutRecipeInput
      | RecipeFoodAllergiesUpsertWithWhereUniqueWithoutRecipeInput[];
    createMany?: RecipeFoodAllergiesCreateManyRecipeInputEnvelope;
    set?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
    disconnect?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
    delete?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
    connect?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
    update?:
      | RecipeFoodAllergiesUpdateWithWhereUniqueWithoutRecipeInput
      | RecipeFoodAllergiesUpdateWithWhereUniqueWithoutRecipeInput[];
    updateMany?:
      | RecipeFoodAllergiesUpdateManyWithWhereWithoutRecipeInput
      | RecipeFoodAllergiesUpdateManyWithWhereWithoutRecipeInput[];
    deleteMany?:
      | RecipeFoodAllergiesScalarWhereInput
      | RecipeFoodAllergiesScalarWhereInput[];
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type IngredientsUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?:
      | XOR<
          IngredientsCreateWithoutRecipeInput,
          IngredientsUncheckedCreateWithoutRecipeInput
        >
      | IngredientsCreateWithoutRecipeInput[]
      | IngredientsUncheckedCreateWithoutRecipeInput[];
    connectOrCreate?:
      | IngredientsCreateOrConnectWithoutRecipeInput
      | IngredientsCreateOrConnectWithoutRecipeInput[];
    upsert?:
      | IngredientsUpsertWithWhereUniqueWithoutRecipeInput
      | IngredientsUpsertWithWhereUniqueWithoutRecipeInput[];
    createMany?: IngredientsCreateManyRecipeInputEnvelope;
    set?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[];
    disconnect?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[];
    delete?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[];
    connect?: IngredientsWhereUniqueInput | IngredientsWhereUniqueInput[];
    update?:
      | IngredientsUpdateWithWhereUniqueWithoutRecipeInput
      | IngredientsUpdateWithWhereUniqueWithoutRecipeInput[];
    updateMany?:
      | IngredientsUpdateManyWithWhereWithoutRecipeInput
      | IngredientsUpdateManyWithWhereWithoutRecipeInput[];
    deleteMany?: IngredientsScalarWhereInput | IngredientsScalarWhereInput[];
  };

  export type InstructionsUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?:
      | XOR<
          InstructionsCreateWithoutRecipeInput,
          InstructionsUncheckedCreateWithoutRecipeInput
        >
      | InstructionsCreateWithoutRecipeInput[]
      | InstructionsUncheckedCreateWithoutRecipeInput[];
    connectOrCreate?:
      | InstructionsCreateOrConnectWithoutRecipeInput
      | InstructionsCreateOrConnectWithoutRecipeInput[];
    upsert?:
      | InstructionsUpsertWithWhereUniqueWithoutRecipeInput
      | InstructionsUpsertWithWhereUniqueWithoutRecipeInput[];
    createMany?: InstructionsCreateManyRecipeInputEnvelope;
    set?: InstructionsWhereUniqueInput | InstructionsWhereUniqueInput[];
    disconnect?: InstructionsWhereUniqueInput | InstructionsWhereUniqueInput[];
    delete?: InstructionsWhereUniqueInput | InstructionsWhereUniqueInput[];
    connect?: InstructionsWhereUniqueInput | InstructionsWhereUniqueInput[];
    update?:
      | InstructionsUpdateWithWhereUniqueWithoutRecipeInput
      | InstructionsUpdateWithWhereUniqueWithoutRecipeInput[];
    updateMany?:
      | InstructionsUpdateManyWithWhereWithoutRecipeInput
      | InstructionsUpdateManyWithWhereWithoutRecipeInput[];
    deleteMany?: InstructionsScalarWhereInput | InstructionsScalarWhereInput[];
  };

  export type RecipeFoodAllergiesUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?:
      | XOR<
          RecipeFoodAllergiesCreateWithoutRecipeInput,
          RecipeFoodAllergiesUncheckedCreateWithoutRecipeInput
        >
      | RecipeFoodAllergiesCreateWithoutRecipeInput[]
      | RecipeFoodAllergiesUncheckedCreateWithoutRecipeInput[];
    connectOrCreate?:
      | RecipeFoodAllergiesCreateOrConnectWithoutRecipeInput
      | RecipeFoodAllergiesCreateOrConnectWithoutRecipeInput[];
    upsert?:
      | RecipeFoodAllergiesUpsertWithWhereUniqueWithoutRecipeInput
      | RecipeFoodAllergiesUpsertWithWhereUniqueWithoutRecipeInput[];
    createMany?: RecipeFoodAllergiesCreateManyRecipeInputEnvelope;
    set?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
    disconnect?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
    delete?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
    connect?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
    update?:
      | RecipeFoodAllergiesUpdateWithWhereUniqueWithoutRecipeInput
      | RecipeFoodAllergiesUpdateWithWhereUniqueWithoutRecipeInput[];
    updateMany?:
      | RecipeFoodAllergiesUpdateManyWithWhereWithoutRecipeInput
      | RecipeFoodAllergiesUpdateManyWithWhereWithoutRecipeInput[];
    deleteMany?:
      | RecipeFoodAllergiesScalarWhereInput
      | RecipeFoodAllergiesScalarWhereInput[];
  };

  export type RecipesCreateNestedOneWithoutIngredientsInput = {
    create?: XOR<
      RecipesCreateWithoutIngredientsInput,
      RecipesUncheckedCreateWithoutIngredientsInput
    >;
    connectOrCreate?: RecipesCreateOrConnectWithoutIngredientsInput;
    connect?: RecipesWhereUniqueInput;
  };

  export type RecipesUpdateOneRequiredWithoutIngredientsNestedInput = {
    create?: XOR<
      RecipesCreateWithoutIngredientsInput,
      RecipesUncheckedCreateWithoutIngredientsInput
    >;
    connectOrCreate?: RecipesCreateOrConnectWithoutIngredientsInput;
    upsert?: RecipesUpsertWithoutIngredientsInput;
    connect?: RecipesWhereUniqueInput;
    update?: XOR<
      XOR<
        RecipesUpdateToOneWithWhereWithoutIngredientsInput,
        RecipesUpdateWithoutIngredientsInput
      >,
      RecipesUncheckedUpdateWithoutIngredientsInput
    >;
  };

  export type RecipesCreateNestedOneWithoutInstructionsInput = {
    create?: XOR<
      RecipesCreateWithoutInstructionsInput,
      RecipesUncheckedCreateWithoutInstructionsInput
    >;
    connectOrCreate?: RecipesCreateOrConnectWithoutInstructionsInput;
    connect?: RecipesWhereUniqueInput;
  };

  export type RecipesUpdateOneRequiredWithoutInstructionsNestedInput = {
    create?: XOR<
      RecipesCreateWithoutInstructionsInput,
      RecipesUncheckedCreateWithoutInstructionsInput
    >;
    connectOrCreate?: RecipesCreateOrConnectWithoutInstructionsInput;
    upsert?: RecipesUpsertWithoutInstructionsInput;
    connect?: RecipesWhereUniqueInput;
    update?: XOR<
      XOR<
        RecipesUpdateToOneWithWhereWithoutInstructionsInput,
        RecipesUpdateWithoutInstructionsInput
      >,
      RecipesUncheckedUpdateWithoutInstructionsInput
    >;
  };

  export type RecipeFoodAllergiesCreateNestedManyWithoutFood_allergyInput = {
    create?:
      | XOR<
          RecipeFoodAllergiesCreateWithoutFood_allergyInput,
          RecipeFoodAllergiesUncheckedCreateWithoutFood_allergyInput
        >
      | RecipeFoodAllergiesCreateWithoutFood_allergyInput[]
      | RecipeFoodAllergiesUncheckedCreateWithoutFood_allergyInput[];
    connectOrCreate?:
      | RecipeFoodAllergiesCreateOrConnectWithoutFood_allergyInput
      | RecipeFoodAllergiesCreateOrConnectWithoutFood_allergyInput[];
    createMany?: RecipeFoodAllergiesCreateManyFood_allergyInputEnvelope;
    connect?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
  };

  export type RecipeFoodAllergiesUncheckedCreateNestedManyWithoutFood_allergyInput =
    {
      create?:
        | XOR<
            RecipeFoodAllergiesCreateWithoutFood_allergyInput,
            RecipeFoodAllergiesUncheckedCreateWithoutFood_allergyInput
          >
        | RecipeFoodAllergiesCreateWithoutFood_allergyInput[]
        | RecipeFoodAllergiesUncheckedCreateWithoutFood_allergyInput[];
      connectOrCreate?:
        | RecipeFoodAllergiesCreateOrConnectWithoutFood_allergyInput
        | RecipeFoodAllergiesCreateOrConnectWithoutFood_allergyInput[];
      createMany?: RecipeFoodAllergiesCreateManyFood_allergyInputEnvelope;
      connect?:
        | RecipeFoodAllergiesWhereUniqueInput
        | RecipeFoodAllergiesWhereUniqueInput[];
    };

  export type RecipeFoodAllergiesUpdateManyWithoutFood_allergyNestedInput = {
    create?:
      | XOR<
          RecipeFoodAllergiesCreateWithoutFood_allergyInput,
          RecipeFoodAllergiesUncheckedCreateWithoutFood_allergyInput
        >
      | RecipeFoodAllergiesCreateWithoutFood_allergyInput[]
      | RecipeFoodAllergiesUncheckedCreateWithoutFood_allergyInput[];
    connectOrCreate?:
      | RecipeFoodAllergiesCreateOrConnectWithoutFood_allergyInput
      | RecipeFoodAllergiesCreateOrConnectWithoutFood_allergyInput[];
    upsert?:
      | RecipeFoodAllergiesUpsertWithWhereUniqueWithoutFood_allergyInput
      | RecipeFoodAllergiesUpsertWithWhereUniqueWithoutFood_allergyInput[];
    createMany?: RecipeFoodAllergiesCreateManyFood_allergyInputEnvelope;
    set?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
    disconnect?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
    delete?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
    connect?:
      | RecipeFoodAllergiesWhereUniqueInput
      | RecipeFoodAllergiesWhereUniqueInput[];
    update?:
      | RecipeFoodAllergiesUpdateWithWhereUniqueWithoutFood_allergyInput
      | RecipeFoodAllergiesUpdateWithWhereUniqueWithoutFood_allergyInput[];
    updateMany?:
      | RecipeFoodAllergiesUpdateManyWithWhereWithoutFood_allergyInput
      | RecipeFoodAllergiesUpdateManyWithWhereWithoutFood_allergyInput[];
    deleteMany?:
      | RecipeFoodAllergiesScalarWhereInput
      | RecipeFoodAllergiesScalarWhereInput[];
  };

  export type RecipeFoodAllergiesUncheckedUpdateManyWithoutFood_allergyNestedInput =
    {
      create?:
        | XOR<
            RecipeFoodAllergiesCreateWithoutFood_allergyInput,
            RecipeFoodAllergiesUncheckedCreateWithoutFood_allergyInput
          >
        | RecipeFoodAllergiesCreateWithoutFood_allergyInput[]
        | RecipeFoodAllergiesUncheckedCreateWithoutFood_allergyInput[];
      connectOrCreate?:
        | RecipeFoodAllergiesCreateOrConnectWithoutFood_allergyInput
        | RecipeFoodAllergiesCreateOrConnectWithoutFood_allergyInput[];
      upsert?:
        | RecipeFoodAllergiesUpsertWithWhereUniqueWithoutFood_allergyInput
        | RecipeFoodAllergiesUpsertWithWhereUniqueWithoutFood_allergyInput[];
      createMany?: RecipeFoodAllergiesCreateManyFood_allergyInputEnvelope;
      set?:
        | RecipeFoodAllergiesWhereUniqueInput
        | RecipeFoodAllergiesWhereUniqueInput[];
      disconnect?:
        | RecipeFoodAllergiesWhereUniqueInput
        | RecipeFoodAllergiesWhereUniqueInput[];
      delete?:
        | RecipeFoodAllergiesWhereUniqueInput
        | RecipeFoodAllergiesWhereUniqueInput[];
      connect?:
        | RecipeFoodAllergiesWhereUniqueInput
        | RecipeFoodAllergiesWhereUniqueInput[];
      update?:
        | RecipeFoodAllergiesUpdateWithWhereUniqueWithoutFood_allergyInput
        | RecipeFoodAllergiesUpdateWithWhereUniqueWithoutFood_allergyInput[];
      updateMany?:
        | RecipeFoodAllergiesUpdateManyWithWhereWithoutFood_allergyInput
        | RecipeFoodAllergiesUpdateManyWithWhereWithoutFood_allergyInput[];
      deleteMany?:
        | RecipeFoodAllergiesScalarWhereInput
        | RecipeFoodAllergiesScalarWhereInput[];
    };

  export type RecipesCreateNestedOneWithoutRecipe_food_allergiesInput = {
    create?: XOR<
      RecipesCreateWithoutRecipe_food_allergiesInput,
      RecipesUncheckedCreateWithoutRecipe_food_allergiesInput
    >;
    connectOrCreate?: RecipesCreateOrConnectWithoutRecipe_food_allergiesInput;
    connect?: RecipesWhereUniqueInput;
  };

  export type FoodAllergiesCreateNestedOneWithoutRecipe_food_allergiesInput = {
    create?: XOR<
      FoodAllergiesCreateWithoutRecipe_food_allergiesInput,
      FoodAllergiesUncheckedCreateWithoutRecipe_food_allergiesInput
    >;
    connectOrCreate?: FoodAllergiesCreateOrConnectWithoutRecipe_food_allergiesInput;
    connect?: FoodAllergiesWhereUniqueInput;
  };

  export type RecipesUpdateOneRequiredWithoutRecipe_food_allergiesNestedInput =
    {
      create?: XOR<
        RecipesCreateWithoutRecipe_food_allergiesInput,
        RecipesUncheckedCreateWithoutRecipe_food_allergiesInput
      >;
      connectOrCreate?: RecipesCreateOrConnectWithoutRecipe_food_allergiesInput;
      upsert?: RecipesUpsertWithoutRecipe_food_allergiesInput;
      connect?: RecipesWhereUniqueInput;
      update?: XOR<
        XOR<
          RecipesUpdateToOneWithWhereWithoutRecipe_food_allergiesInput,
          RecipesUpdateWithoutRecipe_food_allergiesInput
        >,
        RecipesUncheckedUpdateWithoutRecipe_food_allergiesInput
      >;
    };

  export type FoodAllergiesUpdateOneRequiredWithoutRecipe_food_allergiesNestedInput =
    {
      create?: XOR<
        FoodAllergiesCreateWithoutRecipe_food_allergiesInput,
        FoodAllergiesUncheckedCreateWithoutRecipe_food_allergiesInput
      >;
      connectOrCreate?: FoodAllergiesCreateOrConnectWithoutRecipe_food_allergiesInput;
      upsert?: FoodAllergiesUpsertWithoutRecipe_food_allergiesInput;
      connect?: FoodAllergiesWhereUniqueInput;
      update?: XOR<
        XOR<
          FoodAllergiesUpdateToOneWithWhereWithoutRecipe_food_allergiesInput,
          FoodAllergiesUpdateWithoutRecipe_food_allergiesInput
        >,
        FoodAllergiesUncheckedUpdateWithoutRecipe_food_allergiesInput
      >;
    };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        | Date[]
        | string[]
        | ListDateTimeFieldRefInput<$PrismaModel>
        | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };

  export type IngredientsCreateWithoutRecipeInput = {
    subrecipe_title?: string | null;
    name: string;
    amount?: string | null;
    unit?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type IngredientsUncheckedCreateWithoutRecipeInput = {
    id?: number;
    subrecipe_title?: string | null;
    name: string;
    amount?: string | null;
    unit?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type IngredientsCreateOrConnectWithoutRecipeInput = {
    where: IngredientsWhereUniqueInput;
    create: XOR<
      IngredientsCreateWithoutRecipeInput,
      IngredientsUncheckedCreateWithoutRecipeInput
    >;
  };

  export type IngredientsCreateManyRecipeInputEnvelope = {
    data: IngredientsCreateManyRecipeInput | IngredientsCreateManyRecipeInput[];
    skipDuplicates?: boolean;
  };

  export type InstructionsCreateWithoutRecipeInput = {
    subrecipe_title?: string | null;
    body: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type InstructionsUncheckedCreateWithoutRecipeInput = {
    id?: number;
    subrecipe_title?: string | null;
    body: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type InstructionsCreateOrConnectWithoutRecipeInput = {
    where: InstructionsWhereUniqueInput;
    create: XOR<
      InstructionsCreateWithoutRecipeInput,
      InstructionsUncheckedCreateWithoutRecipeInput
    >;
  };

  export type InstructionsCreateManyRecipeInputEnvelope = {
    data:
      | InstructionsCreateManyRecipeInput
      | InstructionsCreateManyRecipeInput[];
    skipDuplicates?: boolean;
  };

  export type RecipeFoodAllergiesCreateWithoutRecipeInput = {
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    food_allergy: FoodAllergiesCreateNestedOneWithoutRecipe_food_allergiesInput;
  };

  export type RecipeFoodAllergiesUncheckedCreateWithoutRecipeInput = {
    id?: number;
    food_allergy_id: number;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type RecipeFoodAllergiesCreateOrConnectWithoutRecipeInput = {
    where: RecipeFoodAllergiesWhereUniqueInput;
    create: XOR<
      RecipeFoodAllergiesCreateWithoutRecipeInput,
      RecipeFoodAllergiesUncheckedCreateWithoutRecipeInput
    >;
  };

  export type RecipeFoodAllergiesCreateManyRecipeInputEnvelope = {
    data:
      | RecipeFoodAllergiesCreateManyRecipeInput
      | RecipeFoodAllergiesCreateManyRecipeInput[];
    skipDuplicates?: boolean;
  };

  export type IngredientsUpsertWithWhereUniqueWithoutRecipeInput = {
    where: IngredientsWhereUniqueInput;
    update: XOR<
      IngredientsUpdateWithoutRecipeInput,
      IngredientsUncheckedUpdateWithoutRecipeInput
    >;
    create: XOR<
      IngredientsCreateWithoutRecipeInput,
      IngredientsUncheckedCreateWithoutRecipeInput
    >;
  };

  export type IngredientsUpdateWithWhereUniqueWithoutRecipeInput = {
    where: IngredientsWhereUniqueInput;
    data: XOR<
      IngredientsUpdateWithoutRecipeInput,
      IngredientsUncheckedUpdateWithoutRecipeInput
    >;
  };

  export type IngredientsUpdateManyWithWhereWithoutRecipeInput = {
    where: IngredientsScalarWhereInput;
    data: XOR<
      IngredientsUpdateManyMutationInput,
      IngredientsUncheckedUpdateManyWithoutRecipeInput
    >;
  };

  export type IngredientsScalarWhereInput = {
    AND?: IngredientsScalarWhereInput | IngredientsScalarWhereInput[];
    OR?: IngredientsScalarWhereInput[];
    NOT?: IngredientsScalarWhereInput | IngredientsScalarWhereInput[];
    id?: IntFilter<'Ingredients'> | number;
    recipe_id?: IntFilter<'Ingredients'> | number;
    subrecipe_title?: StringNullableFilter<'Ingredients'> | string | null;
    name?: StringFilter<'Ingredients'> | string;
    amount?: StringNullableFilter<'Ingredients'> | string | null;
    unit?: StringNullableFilter<'Ingredients'> | string | null;
    created_at?: DateTimeFilter<'Ingredients'> | Date | string;
    updated_at?: DateTimeFilter<'Ingredients'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'Ingredients'> | Date | string | null;
  };

  export type InstructionsUpsertWithWhereUniqueWithoutRecipeInput = {
    where: InstructionsWhereUniqueInput;
    update: XOR<
      InstructionsUpdateWithoutRecipeInput,
      InstructionsUncheckedUpdateWithoutRecipeInput
    >;
    create: XOR<
      InstructionsCreateWithoutRecipeInput,
      InstructionsUncheckedCreateWithoutRecipeInput
    >;
  };

  export type InstructionsUpdateWithWhereUniqueWithoutRecipeInput = {
    where: InstructionsWhereUniqueInput;
    data: XOR<
      InstructionsUpdateWithoutRecipeInput,
      InstructionsUncheckedUpdateWithoutRecipeInput
    >;
  };

  export type InstructionsUpdateManyWithWhereWithoutRecipeInput = {
    where: InstructionsScalarWhereInput;
    data: XOR<
      InstructionsUpdateManyMutationInput,
      InstructionsUncheckedUpdateManyWithoutRecipeInput
    >;
  };

  export type InstructionsScalarWhereInput = {
    AND?: InstructionsScalarWhereInput | InstructionsScalarWhereInput[];
    OR?: InstructionsScalarWhereInput[];
    NOT?: InstructionsScalarWhereInput | InstructionsScalarWhereInput[];
    id?: IntFilter<'Instructions'> | number;
    recipe_id?: IntFilter<'Instructions'> | number;
    subrecipe_title?: StringNullableFilter<'Instructions'> | string | null;
    body?: StringFilter<'Instructions'> | string;
    created_at?: DateTimeFilter<'Instructions'> | Date | string;
    updated_at?: DateTimeFilter<'Instructions'> | Date | string;
    deleted_at?: DateTimeNullableFilter<'Instructions'> | Date | string | null;
  };

  export type RecipeFoodAllergiesUpsertWithWhereUniqueWithoutRecipeInput = {
    where: RecipeFoodAllergiesWhereUniqueInput;
    update: XOR<
      RecipeFoodAllergiesUpdateWithoutRecipeInput,
      RecipeFoodAllergiesUncheckedUpdateWithoutRecipeInput
    >;
    create: XOR<
      RecipeFoodAllergiesCreateWithoutRecipeInput,
      RecipeFoodAllergiesUncheckedCreateWithoutRecipeInput
    >;
  };

  export type RecipeFoodAllergiesUpdateWithWhereUniqueWithoutRecipeInput = {
    where: RecipeFoodAllergiesWhereUniqueInput;
    data: XOR<
      RecipeFoodAllergiesUpdateWithoutRecipeInput,
      RecipeFoodAllergiesUncheckedUpdateWithoutRecipeInput
    >;
  };

  export type RecipeFoodAllergiesUpdateManyWithWhereWithoutRecipeInput = {
    where: RecipeFoodAllergiesScalarWhereInput;
    data: XOR<
      RecipeFoodAllergiesUpdateManyMutationInput,
      RecipeFoodAllergiesUncheckedUpdateManyWithoutRecipeInput
    >;
  };

  export type RecipeFoodAllergiesScalarWhereInput = {
    AND?:
      | RecipeFoodAllergiesScalarWhereInput
      | RecipeFoodAllergiesScalarWhereInput[];
    OR?: RecipeFoodAllergiesScalarWhereInput[];
    NOT?:
      | RecipeFoodAllergiesScalarWhereInput
      | RecipeFoodAllergiesScalarWhereInput[];
    id?: IntFilter<'RecipeFoodAllergies'> | number;
    recipe_id?: IntFilter<'RecipeFoodAllergies'> | number;
    food_allergy_id?: IntFilter<'RecipeFoodAllergies'> | number;
    created_at?: DateTimeFilter<'RecipeFoodAllergies'> | Date | string;
    updated_at?: DateTimeFilter<'RecipeFoodAllergies'> | Date | string;
    deleted_at?:
      | DateTimeNullableFilter<'RecipeFoodAllergies'>
      | Date
      | string
      | null;
  };

  export type RecipesCreateWithoutIngredientsInput = {
    title: string;
    cooking_time?: string | null;
    cooking_temperature?: number | null;
    servings?: string | null;
    mold_type?: string | null;
    mold_size?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    instructions?: InstructionsCreateNestedManyWithoutRecipeInput;
    recipe_food_allergies?: RecipeFoodAllergiesCreateNestedManyWithoutRecipeInput;
  };

  export type RecipesUncheckedCreateWithoutIngredientsInput = {
    id?: number;
    title: string;
    cooking_time?: string | null;
    cooking_temperature?: number | null;
    servings?: string | null;
    mold_type?: string | null;
    mold_size?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    instructions?: InstructionsUncheckedCreateNestedManyWithoutRecipeInput;
    recipe_food_allergies?: RecipeFoodAllergiesUncheckedCreateNestedManyWithoutRecipeInput;
  };

  export type RecipesCreateOrConnectWithoutIngredientsInput = {
    where: RecipesWhereUniqueInput;
    create: XOR<
      RecipesCreateWithoutIngredientsInput,
      RecipesUncheckedCreateWithoutIngredientsInput
    >;
  };

  export type RecipesUpsertWithoutIngredientsInput = {
    update: XOR<
      RecipesUpdateWithoutIngredientsInput,
      RecipesUncheckedUpdateWithoutIngredientsInput
    >;
    create: XOR<
      RecipesCreateWithoutIngredientsInput,
      RecipesUncheckedCreateWithoutIngredientsInput
    >;
    where?: RecipesWhereInput;
  };

  export type RecipesUpdateToOneWithWhereWithoutIngredientsInput = {
    where?: RecipesWhereInput;
    data: XOR<
      RecipesUpdateWithoutIngredientsInput,
      RecipesUncheckedUpdateWithoutIngredientsInput
    >;
  };

  export type RecipesUpdateWithoutIngredientsInput = {
    title?: StringFieldUpdateOperationsInput | string;
    cooking_time?: NullableStringFieldUpdateOperationsInput | string | null;
    cooking_temperature?: NullableIntFieldUpdateOperationsInput | number | null;
    servings?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_type?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_size?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    instructions?: InstructionsUpdateManyWithoutRecipeNestedInput;
    recipe_food_allergies?: RecipeFoodAllergiesUpdateManyWithoutRecipeNestedInput;
  };

  export type RecipesUncheckedUpdateWithoutIngredientsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    cooking_time?: NullableStringFieldUpdateOperationsInput | string | null;
    cooking_temperature?: NullableIntFieldUpdateOperationsInput | number | null;
    servings?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_type?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_size?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    instructions?: InstructionsUncheckedUpdateManyWithoutRecipeNestedInput;
    recipe_food_allergies?: RecipeFoodAllergiesUncheckedUpdateManyWithoutRecipeNestedInput;
  };

  export type RecipesCreateWithoutInstructionsInput = {
    title: string;
    cooking_time?: string | null;
    cooking_temperature?: number | null;
    servings?: string | null;
    mold_type?: string | null;
    mold_size?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    ingredients?: IngredientsCreateNestedManyWithoutRecipeInput;
    recipe_food_allergies?: RecipeFoodAllergiesCreateNestedManyWithoutRecipeInput;
  };

  export type RecipesUncheckedCreateWithoutInstructionsInput = {
    id?: number;
    title: string;
    cooking_time?: string | null;
    cooking_temperature?: number | null;
    servings?: string | null;
    mold_type?: string | null;
    mold_size?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    ingredients?: IngredientsUncheckedCreateNestedManyWithoutRecipeInput;
    recipe_food_allergies?: RecipeFoodAllergiesUncheckedCreateNestedManyWithoutRecipeInput;
  };

  export type RecipesCreateOrConnectWithoutInstructionsInput = {
    where: RecipesWhereUniqueInput;
    create: XOR<
      RecipesCreateWithoutInstructionsInput,
      RecipesUncheckedCreateWithoutInstructionsInput
    >;
  };

  export type RecipesUpsertWithoutInstructionsInput = {
    update: XOR<
      RecipesUpdateWithoutInstructionsInput,
      RecipesUncheckedUpdateWithoutInstructionsInput
    >;
    create: XOR<
      RecipesCreateWithoutInstructionsInput,
      RecipesUncheckedCreateWithoutInstructionsInput
    >;
    where?: RecipesWhereInput;
  };

  export type RecipesUpdateToOneWithWhereWithoutInstructionsInput = {
    where?: RecipesWhereInput;
    data: XOR<
      RecipesUpdateWithoutInstructionsInput,
      RecipesUncheckedUpdateWithoutInstructionsInput
    >;
  };

  export type RecipesUpdateWithoutInstructionsInput = {
    title?: StringFieldUpdateOperationsInput | string;
    cooking_time?: NullableStringFieldUpdateOperationsInput | string | null;
    cooking_temperature?: NullableIntFieldUpdateOperationsInput | number | null;
    servings?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_type?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_size?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    ingredients?: IngredientsUpdateManyWithoutRecipeNestedInput;
    recipe_food_allergies?: RecipeFoodAllergiesUpdateManyWithoutRecipeNestedInput;
  };

  export type RecipesUncheckedUpdateWithoutInstructionsInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    cooking_time?: NullableStringFieldUpdateOperationsInput | string | null;
    cooking_temperature?: NullableIntFieldUpdateOperationsInput | number | null;
    servings?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_type?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_size?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    ingredients?: IngredientsUncheckedUpdateManyWithoutRecipeNestedInput;
    recipe_food_allergies?: RecipeFoodAllergiesUncheckedUpdateManyWithoutRecipeNestedInput;
  };

  export type RecipeFoodAllergiesCreateWithoutFood_allergyInput = {
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    recipe: RecipesCreateNestedOneWithoutRecipe_food_allergiesInput;
  };

  export type RecipeFoodAllergiesUncheckedCreateWithoutFood_allergyInput = {
    id?: number;
    recipe_id: number;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type RecipeFoodAllergiesCreateOrConnectWithoutFood_allergyInput = {
    where: RecipeFoodAllergiesWhereUniqueInput;
    create: XOR<
      RecipeFoodAllergiesCreateWithoutFood_allergyInput,
      RecipeFoodAllergiesUncheckedCreateWithoutFood_allergyInput
    >;
  };

  export type RecipeFoodAllergiesCreateManyFood_allergyInputEnvelope = {
    data:
      | RecipeFoodAllergiesCreateManyFood_allergyInput
      | RecipeFoodAllergiesCreateManyFood_allergyInput[];
    skipDuplicates?: boolean;
  };

  export type RecipeFoodAllergiesUpsertWithWhereUniqueWithoutFood_allergyInput =
    {
      where: RecipeFoodAllergiesWhereUniqueInput;
      update: XOR<
        RecipeFoodAllergiesUpdateWithoutFood_allergyInput,
        RecipeFoodAllergiesUncheckedUpdateWithoutFood_allergyInput
      >;
      create: XOR<
        RecipeFoodAllergiesCreateWithoutFood_allergyInput,
        RecipeFoodAllergiesUncheckedCreateWithoutFood_allergyInput
      >;
    };

  export type RecipeFoodAllergiesUpdateWithWhereUniqueWithoutFood_allergyInput =
    {
      where: RecipeFoodAllergiesWhereUniqueInput;
      data: XOR<
        RecipeFoodAllergiesUpdateWithoutFood_allergyInput,
        RecipeFoodAllergiesUncheckedUpdateWithoutFood_allergyInput
      >;
    };

  export type RecipeFoodAllergiesUpdateManyWithWhereWithoutFood_allergyInput = {
    where: RecipeFoodAllergiesScalarWhereInput;
    data: XOR<
      RecipeFoodAllergiesUpdateManyMutationInput,
      RecipeFoodAllergiesUncheckedUpdateManyWithoutFood_allergyInput
    >;
  };

  export type RecipesCreateWithoutRecipe_food_allergiesInput = {
    title: string;
    cooking_time?: string | null;
    cooking_temperature?: number | null;
    servings?: string | null;
    mold_type?: string | null;
    mold_size?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    ingredients?: IngredientsCreateNestedManyWithoutRecipeInput;
    instructions?: InstructionsCreateNestedManyWithoutRecipeInput;
  };

  export type RecipesUncheckedCreateWithoutRecipe_food_allergiesInput = {
    id?: number;
    title: string;
    cooking_time?: string | null;
    cooking_temperature?: number | null;
    servings?: string | null;
    mold_type?: string | null;
    mold_size?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
    ingredients?: IngredientsUncheckedCreateNestedManyWithoutRecipeInput;
    instructions?: InstructionsUncheckedCreateNestedManyWithoutRecipeInput;
  };

  export type RecipesCreateOrConnectWithoutRecipe_food_allergiesInput = {
    where: RecipesWhereUniqueInput;
    create: XOR<
      RecipesCreateWithoutRecipe_food_allergiesInput,
      RecipesUncheckedCreateWithoutRecipe_food_allergiesInput
    >;
  };

  export type FoodAllergiesCreateWithoutRecipe_food_allergiesInput = {
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type FoodAllergiesUncheckedCreateWithoutRecipe_food_allergiesInput = {
    id?: number;
    name: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type FoodAllergiesCreateOrConnectWithoutRecipe_food_allergiesInput = {
    where: FoodAllergiesWhereUniqueInput;
    create: XOR<
      FoodAllergiesCreateWithoutRecipe_food_allergiesInput,
      FoodAllergiesUncheckedCreateWithoutRecipe_food_allergiesInput
    >;
  };

  export type RecipesUpsertWithoutRecipe_food_allergiesInput = {
    update: XOR<
      RecipesUpdateWithoutRecipe_food_allergiesInput,
      RecipesUncheckedUpdateWithoutRecipe_food_allergiesInput
    >;
    create: XOR<
      RecipesCreateWithoutRecipe_food_allergiesInput,
      RecipesUncheckedCreateWithoutRecipe_food_allergiesInput
    >;
    where?: RecipesWhereInput;
  };

  export type RecipesUpdateToOneWithWhereWithoutRecipe_food_allergiesInput = {
    where?: RecipesWhereInput;
    data: XOR<
      RecipesUpdateWithoutRecipe_food_allergiesInput,
      RecipesUncheckedUpdateWithoutRecipe_food_allergiesInput
    >;
  };

  export type RecipesUpdateWithoutRecipe_food_allergiesInput = {
    title?: StringFieldUpdateOperationsInput | string;
    cooking_time?: NullableStringFieldUpdateOperationsInput | string | null;
    cooking_temperature?: NullableIntFieldUpdateOperationsInput | number | null;
    servings?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_type?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_size?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    ingredients?: IngredientsUpdateManyWithoutRecipeNestedInput;
    instructions?: InstructionsUpdateManyWithoutRecipeNestedInput;
  };

  export type RecipesUncheckedUpdateWithoutRecipe_food_allergiesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    title?: StringFieldUpdateOperationsInput | string;
    cooking_time?: NullableStringFieldUpdateOperationsInput | string | null;
    cooking_temperature?: NullableIntFieldUpdateOperationsInput | number | null;
    servings?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_type?: NullableStringFieldUpdateOperationsInput | string | null;
    mold_size?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    ingredients?: IngredientsUncheckedUpdateManyWithoutRecipeNestedInput;
    instructions?: InstructionsUncheckedUpdateManyWithoutRecipeNestedInput;
  };

  export type FoodAllergiesUpsertWithoutRecipe_food_allergiesInput = {
    update: XOR<
      FoodAllergiesUpdateWithoutRecipe_food_allergiesInput,
      FoodAllergiesUncheckedUpdateWithoutRecipe_food_allergiesInput
    >;
    create: XOR<
      FoodAllergiesCreateWithoutRecipe_food_allergiesInput,
      FoodAllergiesUncheckedCreateWithoutRecipe_food_allergiesInput
    >;
    where?: FoodAllergiesWhereInput;
  };

  export type FoodAllergiesUpdateToOneWithWhereWithoutRecipe_food_allergiesInput =
    {
      where?: FoodAllergiesWhereInput;
      data: XOR<
        FoodAllergiesUpdateWithoutRecipe_food_allergiesInput,
        FoodAllergiesUncheckedUpdateWithoutRecipe_food_allergiesInput
      >;
    };

  export type FoodAllergiesUpdateWithoutRecipe_food_allergiesInput = {
    name?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type FoodAllergiesUncheckedUpdateWithoutRecipe_food_allergiesInput = {
    id?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type IngredientsCreateManyRecipeInput = {
    id?: number;
    subrecipe_title?: string | null;
    name: string;
    amount?: string | null;
    unit?: string | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type InstructionsCreateManyRecipeInput = {
    id?: number;
    subrecipe_title?: string | null;
    body: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type RecipeFoodAllergiesCreateManyRecipeInput = {
    id?: number;
    food_allergy_id: number;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type IngredientsUpdateWithoutRecipeInput = {
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    amount?: NullableStringFieldUpdateOperationsInput | string | null;
    unit?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type IngredientsUncheckedUpdateWithoutRecipeInput = {
    id?: IntFieldUpdateOperationsInput | number;
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    amount?: NullableStringFieldUpdateOperationsInput | string | null;
    unit?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type IngredientsUncheckedUpdateManyWithoutRecipeInput = {
    id?: IntFieldUpdateOperationsInput | number;
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    name?: StringFieldUpdateOperationsInput | string;
    amount?: NullableStringFieldUpdateOperationsInput | string | null;
    unit?: NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type InstructionsUpdateWithoutRecipeInput = {
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    body?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type InstructionsUncheckedUpdateWithoutRecipeInput = {
    id?: IntFieldUpdateOperationsInput | number;
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    body?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type InstructionsUncheckedUpdateManyWithoutRecipeInput = {
    id?: IntFieldUpdateOperationsInput | number;
    subrecipe_title?: NullableStringFieldUpdateOperationsInput | string | null;
    body?: StringFieldUpdateOperationsInput | string;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type RecipeFoodAllergiesUpdateWithoutRecipeInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    food_allergy?: FoodAllergiesUpdateOneRequiredWithoutRecipe_food_allergiesNestedInput;
  };

  export type RecipeFoodAllergiesUncheckedUpdateWithoutRecipeInput = {
    id?: IntFieldUpdateOperationsInput | number;
    food_allergy_id?: IntFieldUpdateOperationsInput | number;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type RecipeFoodAllergiesUncheckedUpdateManyWithoutRecipeInput = {
    id?: IntFieldUpdateOperationsInput | number;
    food_allergy_id?: IntFieldUpdateOperationsInput | number;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type RecipeFoodAllergiesCreateManyFood_allergyInput = {
    id?: number;
    recipe_id: number;
    created_at?: Date | string;
    updated_at?: Date | string;
    deleted_at?: Date | string | null;
  };

  export type RecipeFoodAllergiesUpdateWithoutFood_allergyInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    recipe?: RecipesUpdateOneRequiredWithoutRecipe_food_allergiesNestedInput;
  };

  export type RecipeFoodAllergiesUncheckedUpdateWithoutFood_allergyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    recipe_id?: IntFieldUpdateOperationsInput | number;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  export type RecipeFoodAllergiesUncheckedUpdateManyWithoutFood_allergyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    recipe_id?: IntFieldUpdateOperationsInput | number;
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    deleted_at?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
