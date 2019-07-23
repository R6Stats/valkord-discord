// import GenericRegistrar from "../GenericRegistrar";
// import ArgumentType from "./types/ArgumentType";
// import container from "../../inversify.config";

// class ArgumentRegistrar implements GenericRegistrar<typeof ArgumentType, ArgumentType> {

//   register (clazz: typeof ArgumentType): void {
//     container.bind<ArgumentType>(clazz)
//   }

//   unregister (clazz: typeof ArgumentType): void {
//     container.unbind(clazz)
//   }

//   getRegistered (): ArgumentType[] {
//     return container.getAll<ArgumentType>(ArgumentType)
//   }
// }

// export default ArgumentRegistrar
