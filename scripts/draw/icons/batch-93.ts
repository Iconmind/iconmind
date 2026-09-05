/**
 * R06 · Containers, images & supply chain — what goes into an image, how it is built,
 * where it is kept, and what vouches for it.
 *
 * Three bodies the set already draws carry most of it. `container-run`'s crate - the
 * box with a rail at its left - holds anything that happens inside a container, in the
 * space to the right of the rail. `container-image`'s stack of shrinking layers holds
 * anything that is about an image - drawn the way `archive` draws a box, a lid over a
 * crate, with the qualifier inside the crate. `registry-image`'s shelf holds anything about where images live.
 * Builds are the brick build-pass stands on; what vouches is a shield or a document.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { cycle, page, shield, tray } from "../bodies.ts";
import { SMALL, add, check, keyMark, remove, searchMark, shieldMark, squareMark, tagMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "devops", subcategory: "container", name, description,
  tags, family, aliases, keywords, shapes,
});

/** `container-run`'s crate: the box and its left rail; what happens inside sits right of the rail. */
const CRATE = () => [rect(3, 6, 18, 14, 2), col(6, 6, 20)];
/** An image as `archive` draws a box: a lid and a crate; what qualifies it sits inside. */
const IMAGE = () => [rect(3, 2, 18, 5, 2.5), rect(3, 10, 18, 12, 2)];
/** `registry-image`'s shelf with its bays; what is above it is what goes in or out. */
const SHELF = () => [rect(2, 10, 20, 9, 2), col(8, 10, 19), col(15, 10, 19)];
/** `build-pass`'s brick on its base. */
const BRICK = () => [rect(4, 4, 16, 12, 2)];
const BASE = () => row(19, 7, 17);

export const BATCH_93: Icon[] = [
  /* ── inside the container ─────────────────────────────────────────────────────── */
  c("container-exec", "Container exec", "A prompt inside the crate — a shell opened inside a running container",
    ["exec", "shell", "attach"], [], ["docker exec", "container shell", "attach shell", "exec into container"],
    "grid", [...CRATE(), poly([[9, 9.5], [11.5, 12], [9, 14.5]]), row(14.5, 13, 17.5)]),
  c("container-logs", "Container logs", "Lines of output inside the crate — what a container has written since it started",
    ["logs", "output", "stdout"], [], ["container logs", "docker logs", "stdout", "log tail"],
    "grid", [...CRATE(), row(10, 9, 17), row(13, 9, 17), row(16, 9, 14)]),
  c("container-restart", "Container restart", "A play against a bar inside the crate — the container started over from the beginning",
    ["restart", "reboot", "again"], [], ["restart container", "container reboot", "restart policy", "start again"],
    "grid", [...CRATE(), col(9.5, 9.5, 15.5), poly([[11.5, 9.5], [11.5, 15.5], [14.5, 12.5]], true)]),
  c("container-health", "Container health", "A check inside the crate — the container answers its health check and is fit to serve",
    ["health", "healthy", "check"], [], ["container health", "healthcheck", "healthy container", "docker healthcheck"],
    "grid", [...CRATE(), poly([[10, 12.5], [12.5, 15], [17, 10.5]])]),
  c("entrypoint", "Entrypoint", "An arrow arriving inside the crate — the command a container runs the moment it starts",
    ["entrypoint", "command", "start"], [], ["entrypoint", "container command", "cmd", "start command"],
    "grid", [...CRATE(), row(12.5, 8.5, 15), poly([[12.5, 10], [15, 12.5], [12.5, 15]])]),
  c("volume-mount", "Volume mount", "A cylinder inside the crate — persistent storage mounted where the container expects it",
    ["volume", "mount", "storage"], [], ["volume mount", "docker volume", "mounted volume", "persistent storage"],
    "grid", [...CRATE(), raw("M10 9.5A3.5 1.5 0 0 1 17 9.5V15.5A3.5 1.5 0 0 1 10 15.5Z", "a small cylinder, rim and sides, sized to the crate", true)]),
  c("bind-mount", "Bind mount", "A folder inside the crate — a directory from the host shown into the container as is",
    ["bind", "mount", "host"], [], ["bind mount", "host directory", "mount path", "host folder"],
    "grid", [...CRATE(), poly([[10, 16], [10, 9.5], [13, 9.5], [15, 11.5], [17.5, 11.5], [17.5, 16]], true)]),
  c("container-network", "Container network", "A globe inside the crate — the network a container joins and the names it can reach",
    ["network", "bridge", "dns"], [], ["container network", "docker network", "bridge network", "service name"],
    "grid", [...CRATE(), disc(13.5, 12.5, 3.5), row(12.5, 10, 17)]),
  c("rootless-container", "Rootless container", "A person inside the crate — the container runs as an ordinary user, never as root",
    ["rootless", "user", "unprivileged"], [], ["rootless container", "run as user", "non-root", "unprivileged"],
    "grid", [...CRATE(), disc(13.5, 10.5, 2), arc(13.5, 16.5, 4, 180, 360)]),
  c("capability-drop", "Capability drop", "A minus inside the crate — a kernel capability the container gives up before it runs",
    ["capabilities", "drop", "harden"], [], ["cap drop", "drop capabilities", "least privilege", "harden container"],
    "grid", [...CRATE(), row(12.5, 10, 17)]),
  c("seccomp", "Seccomp profile", "A funnel inside the crate — the system calls a container is allowed to make",
    ["seccomp", "syscall", "filter"], [], ["seccomp profile", "syscall filter", "seccomp", "restrict syscalls"],
    "grid", [...CRATE(), poly([[10, 9.5], [17, 9.5], [14.5, 12], [14.5, 16]]), poly([[12.5, 12], [10, 9.5]])]),
  c("apparmor", "AppArmor profile", "A shield inside the crate — a mandatory access profile wrapped around the container",
    ["apparmor", "mac", "profile"], [], ["apparmor profile", "mandatory access control", "container profile", "selinux"],
    "grid", [...CRATE(), poly([[10.5, 9], [16.5, 9], [16.5, 12.5], [13.5, 15.5], [10.5, 12.5]], true)]),
  c("cache-mount", "Cache mount", "Two shelves inside the crate — a cache slotted into the build so the next run skips the work",
    ["cache", "mount", "build"], [], ["cache mount", "buildkit cache", "mount type cache", "build cache dir"],
    "grid", [...CRATE(), row(11, 9.5, 17.5), row(14.5, 9.5, 17.5)]),
  c("compose-stack", "Compose stack", "Two crates stacked — several containers defined and started together as one application",
    ["compose", "stack", "services"], [], ["docker compose", "compose stack", "multi container", "services file"],
    "grid", [rect(3, 3, 18, 7, 2), col(6, 3, 10), rect(3, 14, 18, 7, 2), col(6, 14, 21)]),

  /* ── the image: layers, and what qualifies them ───────────────────────────────── */
  c("image-layer", "Image layer", "A box with one layer inside — a single filesystem step the image is built from",
    ["layer", "filesystem", "step"], [], ["image layer", "layer", "filesystem layer", "dockerfile step"],
    "window", [...IMAGE(), row(16, 8, 16)]),
  c("image-tag", "Image tag", "A box with a label inside — the human name an image is pushed and pulled by",
    ["tag", "name", "version"], [], ["image tag", "docker tag", "latest tag", "tagged image"],
    "window", [...IMAGE(), ...tagMark(SMALL, 16)]),
  c("image-digest", "Image digest", "A box with hash lines inside — the content address that names exactly this image",
    ["digest", "sha256", "immutable"], [], ["image digest", "sha256 digest", "content address", "pin by digest"],
    "window", [...IMAGE(), row(14, 8, 16), row(18, 8, 13)]),
  c("image-scan", "Image scan", "A box with a lens inside — the image searched for known vulnerabilities before it ships",
    ["scan", "vulnerability", "security"], [], ["image scan", "vulnerability scan", "trivy", "container scan"],
    "window", [...IMAGE(), ...searchMark(SMALL, 16)]),
  c("image-sign", "Image sign", "A box with a signature inside — the image signed so its origin can be proven",
    ["sign", "signature", "provenance"], [], ["image signing", "signed image", "sign container", "verify signature"],
    "window", [...IMAGE(), arc(11, 16, 2.5, 0, 180), poly([[13.5, 16], [16.5, 13]])]),
  c("cosign", "Cosign", "A box with a key inside — the keypair-based signature that seals an image",
    ["cosign", "sigstore", "key"], [], ["cosign", "sigstore", "keyless signing", "image signature key"],
    "window", [...IMAGE(), ...keyMark(SMALL, 16)]),
  c("image-prune", "Image prune", "A box with a minus inside — images nobody uses any more removed from the host",
    ["prune", "cleanup", "remove"], [], ["image prune", "docker prune", "remove unused images", "clean up images"],
    "window", [...IMAGE(), ...remove(SMALL, 16)]),
  c("image-bloat", "Image bloat", "A box packed wall to wall — an image far larger than what it needs to run",
    ["bloat", "size", "large"], [], ["image bloat", "large image", "image size", "slim image"],
    "window", [...IMAGE(), row(14, 5, 19), row(18, 5, 19)]),
  c("image-diff", "Image diff", "A box with a plus over a minus inside — what one image has that another does not",
    ["diff", "compare", "layers"], [], ["image diff", "compare images", "layer diff", "dive"],
    "window", [...IMAGE(), col(12, 12.5, 16.5), row(14.5, 10, 14), row(18.5, 10, 14)]),
  c("image-promote", "Image promote", "A box with an arrow rising inside — the same image moved on to the next environment",
    ["promote", "release", "environment"], [], ["image promotion", "promote to prod", "release image", "environment promotion"],
    "window", [...IMAGE(), col(12, 13, 19), poly([[9.5, 15.5], [12, 13], [14.5, 15.5]])]),
  c("base-image", "Base image", "A box with a floor laid inside — the image every other layer is built upon",
    ["base", "from", "parent"], [], ["base image", "from image", "parent image", "official image"],
    "window", [...IMAGE(), row(19, 6, 18)]),
  c("distroless", "Distroless", "A box holding one dot — an image with nothing in it but the program, no shell, no package manager",
    ["distroless", "minimal", "slim"], [], ["distroless", "minimal image", "no shell", "scratch image"],
    "window", [...IMAGE(), disc(12, 16, 1)]),
  c("squash-layer", "Squash layers", "A box with a double chevron pressing up inside — many layers flattened into one",
    ["squash", "flatten", "layers"], [], ["squash layers", "flatten image", "single layer", "squash"],
    "window", [...IMAGE(), poly([[10, 15.5], [12, 13.5], [14, 15.5]]), poly([[10, 18.5], [12, 16.5], [14, 18.5]])]),
  c("layer-cache-hit", "Layer cache hit", "A box with a check inside — a layer already built once and reused as is",
    ["cache", "hit", "layer"], [], ["layer cache", "cache hit", "cached layer", "fast build"],
    "window", [...IMAGE(), ...check(SMALL, 16)]),
  c("patch-image", "Patch image", "A box with a plus inside — a fix applied to an image without rebuilding everything",
    ["patch", "fix", "update"], [], ["patch image", "hotfix image", "rebuild layer", "security patch"],
    "window", [...IMAGE(), ...add(SMALL, 16)]),
  c("oci-artifact", "OCI artifact", "A box with a plain square inside — anything at all stored the way an image is",
    ["oci", "artifact", "blob"], [], ["oci artifact", "oras", "artifact registry", "non-image artifact"],
    "window", [...IMAGE(), ...squareMark(SMALL, 16)]),
  c("sbom", "SBOM", "A box with a bulleted list inside — the bill of every package and version in the image",
    ["sbom", "inventory", "packages"], [], ["software bill of materials", "sbom", "package inventory", "spdx cyclonedx"],
    "window", [...IMAGE(), disc(8, 14, 1), row(14, 10.5, 16), disc(8, 18, 1), row(18, 10.5, 16)]),

  /* ── registries: the shelf ────────────────────────────────────────────────────── */
  c("registry-push", "Registry push", "An arrow coming down onto the shelf — an image sent up to the registry",
    ["push", "upload", "registry"], [], ["docker push", "push image", "upload image", "registry push"],
    "figure", [...SHELF(), col(12, 2, 7), poly([[9.5, 4.5], [12, 7], [14.5, 4.5]])]),
  c("registry-pull", "Registry pull", "An arrow rising off the shelf — an image fetched down from the registry",
    ["pull", "download", "registry"], [], ["docker pull", "pull image", "download image", "registry pull"],
    "figure", [...SHELF(), col(12, 2, 7), poly([[9.5, 4.5], [12, 2], [14.5, 4.5]])]),
  c("trusted-registry", "Trusted registry", "A shield above the shelf — the only registry images may be pulled from",
    ["trusted", "allowlist", "registry"], [], ["trusted registry", "allowed registry", "registry allowlist", "private registry"],
    "figure", [...SHELF(), poly([[9, 2], [15, 2], [15, 5.5], [12, 8.5], [9, 5.5]], true)]),
  c("image-mirror", "Image mirror", "Arrows trading places above the shelf — a registry that keeps a copy of another's images",
    ["mirror", "proxy", "cache"], [], ["registry mirror", "pull through cache", "mirror registry", "image mirror"],
    "figure", [...SHELF(), row(6, 10, 14), poly([[13.5, 3.5], [16, 6], [13.5, 8.5]]), poly([[10.5, 3.5], [8, 6], [10.5, 8.5]])]),
  c("artifact-repo", "Artifact repository", "A box above the shelf — the store that keeps built things of every kind, not only images",
    ["artifact", "repository", "store"], [], ["artifact repository", "artifactory", "nexus", "binary repository"],
    "figure", [...SHELF(), rect(8, 2, 8, 6.5, 2)]),
  c("chart-museum", "Chart repository", "A roof over the shelf — the place packaged charts are published and found",
    ["helm", "charts", "repository"], [], ["chart museum", "helm repository", "chart repo", "oci charts"],
    "figure", [...SHELF(), poly([[8, 8.5], [12, 4.5], [16, 8.5]])]),

  /* ── builds: the brick ────────────────────────────────────────────────────────── */
  c("multi-stage-build", "Multi-stage build", "A double chevron on the brick — a build in stages, each handing on only what the next needs",
    ["multi-stage", "stages", "dockerfile"], [], ["multi-stage build", "build stages", "builder stage", "small final image"],
    "window", [...BRICK(), poly([[8, 8], [11, 11], [8, 14]]), poly([[13, 8], [16, 11], [13, 14]]), BASE()]),
  c("build-arg", "Build argument", "Brackets on the brick — a value passed into the build from outside",
    ["build-arg", "argument", "parameter"], [], ["build arg", "build argument", "arg", "build parameter"],
    "window", [...BRICK(), poly([[10.5, 7.5], [8, 7.5], [8, 12.5], [10.5, 12.5]]), poly([[13.5, 7.5], [16, 7.5], [16, 12.5], [13.5, 12.5]]), BASE()]),
  c("build-cache", "Build cache", "A brick kept in the tray — the pieces of the last build, ready to be reused",
    ["cache", "reuse", "build"], [], ["build cache", "cached build", "buildkit cache", "reuse layers"],
    "tray", [tray(), rect(6, 4, 12, 7, 2)]),
  c("reproducible-build", "Reproducible build", "An equals sign on the brick — build it again anywhere and get the very same bytes",
    ["reproducible", "deterministic", "verify"], [], ["reproducible build", "deterministic build", "same bytes", "verifiable build"],
    "window", [...BRICK(), row(8.5, 9, 15), row(11.5, 9, 15), BASE()]),
  c("build-attest", "Build attestation", "A shield on the brick — a signed statement of how and where the build was made",
    ["attestation", "build", "signed"], [], ["build attestation", "provenance attestation", "signed build", "in-toto"],
    "window", [...BRICK(), ...shieldMark(SMALL, 10), BASE()]),
  c("rebuild-trigger", "Rebuild trigger", "A stop square inside the loop — a build started again because its inputs changed",
    ["rebuild", "trigger", "auto"], [], ["rebuild trigger", "auto rebuild", "rebuild on change", "base image update"],
    "rotation", [...cycle(), ...squareMark(SMALL, 12)]),

  /* ── what vouches: documents and shields ──────────────────────────────────────── */
  c("attestation", "Attestation", "A document with a shield below its title — a signed claim about how an artifact came to be",
    ["attestation", "provenance", "claim"], [], ["attestation", "provenance statement", "signed claim", "in-toto attestation"],
    "page", [page(), row(7, 9, 15), ...shieldMark(SMALL, 14)]),
  c("slsa", "SLSA level", "A shield with three levels inside — how much of the supply chain a build can vouch for",
    ["slsa", "level", "supply-chain"], [], ["slsa", "slsa level", "supply chain levels", "build integrity"],
    "shield", [shield(), row(9, 9, 15), row(12, 9, 15), row(15, 9, 15)]),
  c("cve-scan", "CVE scan", "A shield with a lens inside — known vulnerabilities looked for by their published numbers",
    ["cve", "scan", "vulnerability"], [], ["cve scan", "vulnerability database", "known cves", "security advisory"],
    "shield", [shield(), ...searchMark(SMALL, 11)]),
  c("license-scan", "License scan", "A certificate with a lens where its seal was — the licences inside checked against the rules",
    ["license", "scan", "compliance"], [], ["license scan", "license compliance", "open source licenses", "license audit"],
    "page", [rect(3, 2, 18, 11, 2), row(6, 6, 18), row(9.5, 6, 14), disc(11.5, 18, 3), poly([[13.5, 20], [15.5, 22]])]),
  c("supply-chain", "Supply chain", "A delivery truck — every hand a piece of software passes through before it runs",
    ["supply-chain", "provenance", "delivery"], [], ["software supply chain", "supply chain security", "dependency chain", "provenance"],
    "truck", [raw("M4 5H13A2 2 0 0 1 15 7V10H18.5L21 12.5V15A2 2 0 0 1 19 17H4A2 2 0 0 1 2 15V7A2 2 0 0 1 4 5Z", "truck body and cab drawn as one outline", true), disc(7, 19, 2), disc(17, 19, 2)]),

  /* ── dependencies ─────────────────────────────────────────────────────────────── */
  c("dependency-pin", "Dependency pin", "Two boxes pinned together — a dependency held at one exact version",
    ["pin", "version", "lock"], [], ["pin dependency", "exact version", "version pinning", "lock version"],
    "window", [rect(4, 3, 16, 7, 2), rect(4, 14, 16, 7, 2), col(12, 10, 14)]),
  c("vendor-deps", "Vendor dependencies", "Two boxes brought into the tray — dependencies copied in-house so a build needs no network",
    ["vendor", "offline", "dependencies"], [], ["vendored dependencies", "vendor directory", "offline build", "copied deps"],
    "tray", [tray(), rect(3, 5, 7, 7, 2), rect(14, 5, 7, 7, 2)]),
];
