/**
 * Instruction 可以直接为execute赋值方法，也可以 建一个类继承该接口，并设置execute方法和有关属性
 */
export interface Instruction {
    undo?: Instruction;
    execute: (...args: any[]) => boolean;
}
// class CommandMediator extends Mediator {
//     private undos: Instruction[] = [];
//     private dos: Instruction[] = [];
//     /**
//      * execute
//      */
//     public execute(instructionName: string, ...args: any[]) {
//         const item = this.Storage.filter(i => i.Id == instructionName)[0];
//         if (item) {
//             item[0]
//         }
//     }
// }
/**
 * Command Pattern (needs mediator pattern to store instrucions and parameters)
 * 命令模式 （需要中介模式 协助存储指令和其参数）
 */
export abstract class Command {
    private instructions: { [instructionName: string]: Instruction } = {};
    private undos: Instruction[] = [];
    private dos: Instruction[] = [];
    // private mediator = new CommandMediator();
    constructor() {

    }
    /**
     * to add instruction class  as doable instruction（添加可操作指令)
     * @param instructionName name of instruction(指令名称)
     * @param instruction instruction instance （指令实体）
     */
    AttachInstruction(instructionName: string, instruction: Instruction) {
        this.instructions[instructionName] = instruction;
    }
    /**
     * 执行命令 如果执行了新命令 则所有撤消的指令将被清空（不能再恢复之前撤消过的指令了）
     * @param instructionName 指令名称
     * @param args parameters of instruction(指令需要的参数)
     */
    do(instructionName: string, ...args: any[]) {
        const ins = this.instructions[instructionName];
        if (ins) {
            ins.execute(args);
            this.dos.push(ins);
        }
    }
    undo() {
        if (this.dos.length) {
            const ins = this.dos.pop();
            if (ins.undo && ins.undo.execute()) {
                this.undos.push(ins);
            }
        }
    }
    redo() {
        if (this.undos.length) {
            const ins = this.dos.pop();
            if (ins.execute()) {
                this.dos.push(ins);
            }
        }
    }

}