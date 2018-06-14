import { NodeBase } from './LinkList';
import { LogHelper } from '../Utilities/DocHelper';
export class GNode extends NodeBase {
    private index: number
    public get Index(): number {
        return this.index;
    }
}
export class Edge {
    constructor(public arcTail: GNode, public arcHeard: GNode, public weight: number = 1) {

    }
}
export enum GriphType {
    Directed,
    Undirected
}
export abstract class GriphBase {
    constructor(protected GriphType: GriphType, public nodes: Array<GNode>) {

    }
}

export class MatrixGriph extends GriphBase {
    public Matrix: Array<Array<number>>
    constructor(nodes: Array<GNode>, edges: Array<Edge>, griphType: GriphType = GriphType.Undirected) {
        super(griphType, nodes);
        this.InitMatrix(nodes);
        this.InitEdges(edges);
    }
    private InitMatrix(nodes: Array<GNode>) {
        if (!nodes || nodes.length == 0)
            LogHelper.Error("MatrixGriph:nodes is empty or undefined");
        this.Matrix = [];
        nodes.forEach((n, i) => {
            let l = nodes.length;
            n['index'] = i;
            let a = [];
            while (l--) a.push(Infinity);
            this.Matrix.push(a);
        });
    }
    private InitEdges(edges: Array<Edge>) {
        if (!this.Matrix)
            LogHelper.Error("MatrixGriph:Matrix is undefined,validate InitMatrix mothed");
        if (edges)
            edges.forEach(e => {
                this.Matrix[e[0].Index][e[1].Index] = e.weight;
                if (this.GriphType == GriphType.Undirected)
                    this.Matrix[e[1].Index][e[0].Index] = e.weight;
            })
    }
}

export class GriphOps {
    /**
     * 判断是否有边 顶点必须是初始griph时所用节点
     * @param griph 图 有向或无向
     * @param a 节点 弧尾（有向）
     * @param b 节点 弧头（有向）
     */
    public static Adjacent(griph: GriphBase, a: GNode, b: GNode): boolean {
        if (griph instanceof MatrixGriph) {
            return (griph as MatrixGriph).Matrix[a.Index][b.Index] !== Infinity;
        }
        // if()
        return false;
    }
    /**
     * 过去权重
     * @param g 图 有向或无向
     * @param a 节点 弧尾（有向）
     * @param b 节点 弧头（有向）
     */
    public static GetWeight(g: GriphBase, a: GNode, b: GNode): number {
        if (g instanceof MatrixGriph) {
            return (g as MatrixGriph).Matrix[a.Index][b.Index];
        }
        return Infinity;
    }

    /**
     * 广度优先算法 求最小路径 只能用于非带权图
     * @param griph 
     * @param a 
     */
    public static BFS_MIN_Distance(griph: GriphBase, a: GNode) {

    }
    public static BFSTraverse(g: GriphBase, vistit?: (a: GNode) => void) {
        let queue: Array<GNode>
        let visited: Array<boolean>
        g.nodes.forEach((n, i) => {
            if (!visited[n.Index])
                this.BFS(g, n, queue, visited, vistit);
        })
    }
    private static BFS(g: GriphBase, a: GNode, queue: Array<GNode>, visited: Array<boolean>, vistit?: (a: GNode) => void) {
        if (vistit)
            vistit(a);
        visited[a.Index] = true;
        queue.push(a);
        while (queue.length != 0) {
            let n = queue.shift();
            visited[n.Index] = true;
            vistit(n);
            //TODO.......
        }

    }
    /**
     * 最小生成树  --普里姆
     * 不一定是 到每个节点的最短路径
     * @param griph 
     * @param a 
     */
    public static Prim(griph: GriphBase, a: GNode) {

    }
    /**
     * 最小生成树  --克鲁斯卡尔
     * 不一定是 到每个节点的最短路径
     * @param griph 
     * @param a 
     */
    public static Kruskal(griph: GriphBase, a: GNode) {

    }
    /**
     * 单源 最短路径 --迪克斯特拉
     * @param g 
     * @param a 
     */
    public static Dijkstra(g: GriphBase, a: GNode): Array<Array<GNode>> {
        let dist: Array<number> = [], path: Array<Array<GNode>> = [], s: Array<GNode>
        s.push(a);
        let l = g.nodes.length; path[a.Index] = [a];
        while (l--) {
            let wv: number = Infinity, wn: GNode
            g.nodes.forEach(n => {
                if (s.indexOf(n)) return;
                let sn = s[s.length - 1]
                let w = this.GetWeight(g, sn, n);
                if (!dist[n.Index] || dist[n.Index] > w) {
                    dist[n.Index] = (dist[n.Index] || 0) + w;
                    if (dist[n.Index] != Infinity)
                        path[n.Index] = path[sn.Index].concat([n]);
                }
                if (wv > dist[sn.Index]) { wv = dist[n.Index]; wn = n }
            })
            if (wv != Infinity) {
                s.push(wn);
            } else break;
        }
        return path;
    }
    /**
     * 各节点之间最短路径  --弗洛伊德
     * @param griph 
     */
    public static Floyd(griph: GriphBase) {

    }
}