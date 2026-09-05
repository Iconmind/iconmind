/**
 * R05 · Kubernetes & orchestration — the objects a cluster is made of and the knobs
 * that shape a rollout.
 *
 * The grammar is the set's own devops vocabulary: a pod is the wide capsule with two
 * round slots, and a pod's state or a pod-level knob takes one slot; a cluster is the
 * 2x2 grid, and a cluster-wide thing takes its fourth cell; a node is the disc on the
 * wire. Manifests are page(), controllers are machine(), volumes are the cylinder, and
 * whatever loops rides cycle().
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { cycle, machine, padlock, page, panel } from "../bodies.ts";
import { BIG, SMALL, boltMark, check, diamondMark, tagMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const k8s = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "devops", subcategory: "orchestration", name, description,
  tags, family, aliases, keywords, shapes,
});

/** `pod`'s capsule, byte for byte: the body a pod-level thing takes a slot of. */
const POD = () => rect(2, 5, 20, 14, 2);
/** The left slot filled by a container; the right slot is where the state goes. */
const SLOT_L = () => disc(7, 12, 3);
/** Three cells of `cluster`'s 2x2 grid; the fourth cell is where the cluster-wide thing goes. */
const CELLS = () => [rect(4, 4, 7, 7, 2), rect(14, 4, 7, 7, 2), rect(4, 14, 7, 7, 2)];
/** `block-storage`'s cylinder: the body a volume is. */
const CYL = () => raw("M4 6A8 3 0 0 1 20 6V18A8 3 0 0 1 4 18Z", "a cylinder: an elliptical rim, two sides, the far rim closing it", true);

export const BATCH_92: Icon[] = [
  /* ── the plane and its agents ─────────────────────────────────────────────────── */
  k8s("kubelet", "Kubelet", "A node with the agent at its centre — the daemon on every node that runs the pods it is given",
    ["node", "agent", "daemon"], [], ["kubelet", "node agent", "pod runtime", "node daemon"],
    "node", [disc(12, 12, 4), row(12, 2, 8), row(12, 16, 22), disc(12, 12, 1)]),
  k8s("control-plane", "Control plane", "One hub on a wire above the node line — the plane that decides where every pod goes",
    ["control", "plane", "master"], [], ["control plane", "api server", "controller manager", "master node"],
    "node", [disc(12, 7, 3), row(7, 2, 9), row(7, 15, 22), col(12, 10, 17), row(17, 2, 22)]),
  k8s("scheduler-k8s", "Scheduler", "A pod placed onto a node from above — the scheduler picking where work lands",
    ["scheduler", "placement", "assign"], [], ["kube scheduler", "pod placement", "scheduling", "bind pod"],
    "node", [col(12, 3, 6.5), poly([[9.5, 4], [12, 6.5], [14.5, 4]]), disc(12, 11.5, 2), row(17.5, 2, 22)]),
  k8s("operator-k8s", "Operator", "A check inside the loop — a controller that keeps reconciling until the state matches",
    ["operator", "reconcile", "controller"], [], ["kubernetes operator", "reconcile loop", "custom controller", "desired state"],
    "rotation", [...cycle(), ...check(SMALL, 12)]),
  k8s("kube-context", "Kube context", "A cluster grid with a pin in its last cell — the cluster your commands are pointed at",
    ["context", "current", "cluster"], [], ["kubeconfig context", "current cluster", "switch context", "kubectl context"],
    "grid", [...CELLS(), disc(17.5, 16, 2), poly([[15, 18.5], [17.5, 21], [20, 18.5]])]),

  /* ── workloads: the pod capsule and what fills it ─────────────────────────────── */
  k8s("deployment-k8s", "Deployment", "A capsule with three replicas inside — the workload that keeps that many pods running",
    ["deployment", "replicas", "workload"], [], ["kubernetes deployment", "replica pods", "workload", "desired replicas"],
    "window", [POD(), disc(5.5, 12, 2), disc(12, 12, 2), disc(18.5, 12, 2)]),
  k8s("replicaset", "ReplicaSet", "Two pods with a plus between them — the set that makes more of the same pod on demand",
    ["replicas", "scale", "copies"], [], ["replicaset", "replica count", "scale pods", "identical pods"],
    "window", [POD(), SLOT_L(), disc(17, 12, 3), col(12, 10, 14), row(12, 10, 14)]),
  k8s("statefulset", "StatefulSet", "Three replicas standing on a shared base — pods with a fixed order and their own storage",
    ["stateful", "ordered", "storage"], [], ["statefulset", "ordered pods", "stable identity", "persistent pods"],
    "window", [POD(), disc(5.5, 11, 2), disc(12, 11, 2), disc(18.5, 11, 2), row(16, 6, 18)]),
  k8s("daemonset", "DaemonSet", "One pod on every node along the line — the workload that runs everywhere, once each",
    ["daemon", "every-node", "agent"], [], ["daemonset", "one per node", "node agent", "log collector"],
    "node", [row(17, 2, 22), disc(5, 11, 3), disc(12, 11, 3), disc(19, 11, 3)]),
  k8s("pod-template", "Pod template", "A document with a two-dot pod below its title — the spec every pod is stamped from",
    ["template", "spec", "pod"], [], ["pod template", "pod spec", "template spec", "pod manifest"],
    "page", [page(), row(7, 9, 15), disc(10, 14, 1), disc(14, 14, 1)]),
  k8s("init-container", "Init container", "A square container before the round one — the container that runs first and then steps aside",
    ["init", "container", "setup"], [], ["init container", "setup container", "runs first", "pod init"],
    "window", [POD(), rect(3.5, 8.5, 7, 7, 2), disc(17, 12, 3)]),
  k8s("kube-secret-mount", "Secret mount", "A pod with a masked value in its second slot — a secret mounted into the container",
    ["secret", "mount", "volume"], [], ["secret mount", "mounted secret", "secret volume", "env from secret"],
    "window", [POD(), SLOT_L(), disc(15, 12, 1), disc(19, 12, 1)]),

  /* ── probes: the pod reports from its second slot ─────────────────────────────── */
  k8s("liveness-probe", "Liveness probe", "A pod with a pulse in its second slot — the check that says the container is still alive",
    ["liveness", "probe", "health"], [], ["liveness probe", "container alive", "restart on failure", "health check"],
    "window", [POD(), SLOT_L(), poly([[13, 12], [15.5, 12], [15.5, 9], [18.5, 9], [18.5, 15], [21, 15]])]),
  k8s("readiness-probe", "Readiness probe", "A pod with a check in its second slot — the container is ready to take traffic",
    ["readiness", "probe", "traffic"], [], ["readiness probe", "ready to serve", "endpoint ready", "health check"],
    "window", [POD(), SLOT_L(), poly([[14, 12], [16, 14], [20, 10]])]),
  k8s("startup-probe", "Startup probe", "A pod with a play in its second slot — the check that waits for a slow container to start",
    ["startup", "probe", "boot"], [], ["startup probe", "slow start", "boot check", "initial delay"],
    "window", [POD(), SLOT_L(), poly([[15, 9], [15, 15], [18, 12]], true)]),

  /* ── config, secrets, custom kinds ────────────────────────────────────────────── */
  k8s("configmap", "ConfigMap", "Key and value rows on a screen — plain settings handed to pods without rebuilding them",
    ["config", "settings", "key-value"], [], ["configmap", "config map", "key value config", "environment config"],
    "window", [panel(), row(10, 6, 11), row(10, 13, 18), row(14, 6, 11), row(14, 13, 18)]),
  k8s("secret-k8s", "Secret", "A padlock with a masked value on its body — a credential the cluster keeps and pods read",
    ["secret", "credential", "masked"], [], ["kubernetes secret", "masked value", "credential store", "secret object"],
    "lock", [...padlock(), disc(9, 15.5, 1), disc(12, 15.5, 1), disc(15, 15.5, 1)]),
  k8s("crd", "Custom resource", "A document with a type node below its title — a new kind of object the cluster learns to keep",
    ["custom", "resource", "definition"], [], ["crd", "custom resource definition", "custom kind", "api extension"],
    "page", [page(), row(7, 9, 15), ...diamondMark(SMALL, 14)]),
  k8s("helm-chart", "Helm chart", "A ship's wheel — the packaged chart that installs a whole application at once",
    ["helm", "chart", "package"], [], ["helm chart", "helm install", "chart package", "release chart"],
    "wheel", [disc(12, 12, 6), disc(12, 12, 2), col(12, 2.5, 5), col(12, 19, 21.5), row(12, 2.5, 5), row(12, 19, 21.5)]),
  k8s("priority-class", "Priority class", "A document with a double chevron rising — the class that says which pods go first",
    ["priority", "class", "preempt"], [], ["priority class", "pod priority", "scheduling priority", "preemption"],
    "page", [page(), row(7, 9, 15), poly([[10, 13], [12, 11], [14, 13]]), poly([[10, 16], [12, 14], [14, 16]])]),

  /* ── networking ───────────────────────────────────────────────────────────────── */
  k8s("service-k8s", "Service", "One address above a box of pods — the stable name that fronts whichever pods are alive",
    ["service", "endpoint", "address"], [], ["kubernetes service", "cluster ip", "stable endpoint", "service discovery"],
    "window", [disc(12, 6, 2), col(12, 8, 11), rect(3, 11, 18, 9, 2), disc(8, 15.5, 1), disc(16, 15.5, 1)]),
  k8s("ingress-k8s", "Ingress", "An arrow coming down into a box of pods — outside traffic routed in by host and path",
    ["ingress", "routing", "http"], [], ["kubernetes ingress", "ingress controller", "http routing", "external traffic"],
    "window", [col(12, 3, 6.5), poly([[9.5, 4], [12, 6.5], [14.5, 4]]), rect(3, 11, 18, 9, 2), disc(8, 15.5, 1), disc(16, 15.5, 1)]),

  /* ── scheduling knobs ─────────────────────────────────────────────────────────── */
  k8s("toleration", "Toleration", "A pod carrying the taint's own mark — a pod that accepts a node others are kept off",
    ["toleration", "taint", "schedule"], [], ["toleration", "tolerate taint", "taint match", "schedule on tainted"],
    "window", [POD(), SLOT_L(), col(17, 9, 12), disc(17, 15, 1)]),
  k8s("node-selector", "Node selector", "A chevron picking one node out of three — the label that says which nodes a pod may use",
    ["selector", "label", "node"], [], ["node selector", "node label", "node affinity", "schedule to node"],
    "node", [row(17, 2, 22), disc(5, 12, 2), disc(12, 12, 2), disc(19, 12, 2), poly([[10, 5], [12, 7], [14, 5]])]),
  k8s("node-taint-remove", "Remove taint", "A node with its taint crossed out — the node open again to ordinary pods",
    ["taint", "remove", "untaint"], [], ["remove taint", "untaint node", "taint delete", "open node"],
    "window", [rect(3, 6, 14, 14, 2), poly([[18.5, 3.5], [21.5, 6.5]]), poly([[21.5, 3.5], [18.5, 6.5]])]),
  k8s("pod-evict", "Pod evict", "A pod leaving its capsule at an angle — a pod pushed off a node under pressure",
    ["evict", "pressure", "remove"], [], ["pod eviction", "evicted pod", "node pressure", "preempted pod"],
    "window", [POD(), SLOT_L(), poly([[13, 15], [19, 9]]), poly([[15, 9], [19, 9], [19, 13]])]),
  k8s("drain", "Drain", "A node emptying downward — every pod moved off before the node is taken away",
    ["drain", "maintenance", "empty"], [], ["drain node", "node maintenance", "evict all", "cordon and drain"],
    "node", [disc(12, 9, 4), row(9, 2, 8), row(9, 16, 22), col(12, 14, 19), poly([[9.5, 16.5], [12, 19], [14.5, 16.5]])]),
  k8s("pod-disruption-budget", "Disruption budget", "A pod with a shield in its second slot — how many pods may be down at once",
    ["disruption", "budget", "availability"], [], ["pod disruption budget", "pdb", "min available", "voluntary disruption"],
    "window", [POD(), SLOT_L(), poly([[14, 9], [20, 9], [20, 13], [17, 16], [14, 13]], true)]),

  /* ── scaling ──────────────────────────────────────────────────────────────────── */
  k8s("autoscaler-hpa", "Horizontal autoscaler", "A pod with an arrow pointing sideways — more pods added as the load climbs",
    ["hpa", "horizontal", "scale"], [], ["horizontal pod autoscaler", "hpa", "scale out", "replica scaling"],
    "window", [POD(), SLOT_L(), row(12, 12, 18), poly([[15.5, 9.5], [18, 12], [15.5, 14.5]])]),
  k8s("autoscaler-vpa", "Vertical autoscaler", "A pod with an arrow pointing up — the same pod given more cpu and memory",
    ["vpa", "vertical", "resize"], [], ["vertical pod autoscaler", "vpa", "scale up resources", "right size pod"],
    "window", [POD(), SLOT_L(), col(17, 8, 16), poly([[14.5, 10.5], [17, 8], [19.5, 10.5]])]),
  k8s("cluster-autoscaler", "Cluster autoscaler", "A cluster grid with a new node arriving in its last cell — nodes added when pods cannot fit",
    ["autoscaler", "nodes", "capacity"], [], ["cluster autoscaler", "add nodes", "node scaling", "capacity scaling"],
    "grid", [...CELLS(), poly([[15, 20], [20, 15]]), poly([[16, 15], [20, 15], [20, 19]])]),
  k8s("surge-limit", "Max surge", "Pods up to a bar — how many extra pods a rollout may run above the desired count",
    ["surge", "rollout", "limit"], [], ["max surge", "rolling update surge", "extra pods", "surge limit"],
    "meter", [rect(2, 6, 14, 12, 2), disc(6, 12, 2), disc(12, 12, 2), col(20, 5, 19)]),
  k8s("unavailable-limit", "Max unavailable", "One pod crossed out beside a bar — how many pods a rollout may take down at once",
    ["unavailable", "rollout", "limit"], [], ["max unavailable", "rolling update unavailable", "down pods", "unavailable limit"],
    "meter", [rect(2, 6, 14, 12, 2), disc(6, 12, 2), poly([[10.5, 10.5], [13.5, 13.5]]), poly([[13.5, 10.5], [10.5, 13.5]]), col(20, 5, 19)]),

  /* ── rollouts ─────────────────────────────────────────────────────────────────── */
  k8s("rolling-update", "Rolling update", "Two pods inside the loop — pods swapped a few at a time until all are new",
    ["rolling", "update", "rollout"], [], ["rolling update", "rollout strategy", "zero downtime", "gradual rollout"],
    "rotation", [...cycle(), disc(9, 12, 1), disc(15, 12, 1)]),
  k8s("recreate-strategy", "Recreate strategy", "An X before a fresh pod — every old pod stopped, then the new ones started",
    ["recreate", "strategy", "restart"], [], ["recreate strategy", "stop then start", "downtime deploy", "recreate rollout"],
    "window", [POD(), poly([[5.5, 10], [9.5, 14]]), poly([[9.5, 10], [5.5, 14]]), disc(17, 12, 3)]),
  k8s("canary-deploy", "Canary deploy", "One pod shaped differently from the other — a new version tried on a slice of traffic",
    ["canary", "gradual", "release"], [], ["canary deployment", "canary release", "traffic split", "progressive delivery"],
    "window", [POD(), SLOT_L(), poly([[17, 9], [20, 12], [17, 15], [14, 12]], true)]),
  k8s("rollback-deploy", "Rollback deploy", "An arrow pointing back beside a pod — the deployment returned to its previous revision",
    ["rollback", "revision", "undo"], [], ["rollback deployment", "previous revision", "undo rollout", "revision history"],
    "window", [POD(), row(12, 6, 12), poly([[8.5, 9.5], [6, 12], [8.5, 14.5]]), disc(17, 12, 3)]),
  k8s("cluster-upgrade", "Cluster upgrade", "A cluster grid with an arrow rising in its last cell — the whole cluster moved to a newer version",
    ["upgrade", "version", "cluster"], [], ["cluster upgrade", "kubernetes version", "control plane upgrade", "node upgrade"],
    "grid", [...CELLS(), col(17.5, 15, 21), poly([[15, 17.5], [17.5, 15], [20, 17.5]])]),

  /* ── quotas and limits ────────────────────────────────────────────────────────── */
  k8s("resource-quota", "Resource quota", "A box with a quota bar and what is used — the ceiling on cpu and memory a team may claim",
    ["quota", "resources", "ceiling"], [], ["resource quota", "cpu quota", "memory quota", "quota object"],
    "window", [rect(2, 2, 20, 20, 2), row(15, 6, 18), row(18, 6, 13)]),
  k8s("namespace-quota", "Namespace quota", "A namespace with a level gauge at its side — how much one namespace may spend",
    ["namespace", "quota", "limit"], [], ["namespace quota", "namespace limits", "tenant quota", "per namespace"],
    "window", [rect(2, 2, 20, 20, 2), disc(7, 12, 2), disc(13, 12, 2), col(19, 7, 17)]),
  k8s("limit-range", "Limit range", "A box with a floor, a ceiling and the span between — the least and most a pod may ask for",
    ["limits", "range", "defaults"], [], ["limit range", "default limits", "min max resources", "container limits"],
    "window", [rect(2, 2, 20, 20, 2), row(8, 8, 16), row(16, 8, 16), col(12, 10, 14)]),

  /* ── storage ──────────────────────────────────────────────────────────────────── */
  k8s("persistent-volume-claim", "Volume claim", "A cylinder with a check on it — storage a pod asked for and was granted",
    ["pvc", "storage", "claim"], [], ["persistent volume claim", "pvc", "bound volume", "storage request"],
    "cylinder", [CYL(), ...check(SMALL, 12)]),
  k8s("storage-class", "Storage class", "A cylinder with a label on it — the kind of disk a claim gets, fast or cheap or replicated",
    ["storage", "class", "provisioner"], [], ["storage class", "provisioner", "disk tier", "dynamic provisioning"],
    "cylinder", [CYL(), ...tagMark(SMALL, 12)]),
  k8s("ephemeral-volume", "Ephemeral volume", "A cylinder with a bolt on it — storage that lives as long as the pod and no longer",
    ["ephemeral", "temporary", "scratch"], [], ["ephemeral volume", "emptydir", "scratch space", "pod lifetime"],
    "cylinder", [CYL(), ...boltMark(SMALL, 12)]),

  /* ── identity and access ──────────────────────────────────────────────────────── */
  k8s("role-binding", "Role binding", "A person card with a check beside them — who is bound to which permissions in a namespace",
    ["rbac", "binding", "role"], [], ["role binding", "rbac binding", "grant role", "subject role"],
    "window", [rect(2, 5, 20, 14, 2), disc(8, 11, 2), arc(8, 17, 4, 180, 360), poly([[14, 12], [16, 14], [20, 10]])]),
  k8s("cluster-role", "Cluster role", "A cluster grid with a shield in its last cell — permissions that reach across every namespace",
    ["rbac", "cluster", "role"], [], ["cluster role", "cluster-wide rbac", "cluster permissions", "clusterrolebinding"],
    "grid", [...CELLS(), poly([[14, 14], [21, 14], [21, 17.5], [17.5, 21], [14, 17.5]], true)]),
  k8s("workload-identity", "Workload identity", "An identity card whose face is a container — a pod's own identity to the cloud, no key file",
    ["identity", "workload", "cloud"], [], ["workload identity", "pod identity", "service account federation", "keyless auth"],
    "window", [rect(2, 5, 20, 14, 2), rect(5, 8, 6.5, 8, 2), row(10, 14.5, 19.5), row(14, 14.5, 18.5)]),
  k8s("admission-webhook", "Admission webhook", "A gate with a bolt beside its arm — the hook that inspects each object before it is admitted",
    ["admission", "webhook", "validate"], [], ["admission webhook", "validating webhook", "mutating webhook", "admission controller"],
    "figure", [col(4, 6, 20), poly([[4, 13], [13, 4]]), row(20, 3, 21), poly([[19, 7], [15, 11], [18, 11], [14, 15]])]),

  /* ── nodes and fleets ─────────────────────────────────────────────────────────── */
  k8s("gpu-node", "GPU node", "A node with two pins rising from it — a node that carries accelerators for the pods that need them",
    ["gpu", "node", "accelerator"], [], ["gpu node", "accelerator node", "gpu pool", "nvidia node"],
    "node", [disc(12, 14, 4), row(14, 2, 8), row(14, 16, 22), col(10.5, 3.5, 6.5), col(13.5, 3.5, 6.5)]),
  k8s("fleet-cluster", "Fleet", "A cluster grid whose last cell trails off — many more clusters, managed as one fleet",
    ["fleet", "multi-cluster", "manage"], [], ["cluster fleet", "multi cluster", "fleet management", "many clusters"],
    "grid", [...CELLS(), disc(15.5, 17.5, 1), disc(19.5, 17.5, 1)]),
];
