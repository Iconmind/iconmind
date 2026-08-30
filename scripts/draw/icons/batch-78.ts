/**
 * Batch 78 — round 2 of the parity plan: the folder and user families.
 *
 * Folders take their mark inside the body at the slot folder-add/check/off/alert
 * established (SMALL, centred on 13). People take theirs at the right shoulder, where
 * user-add and user-off put it — the figure stands at x 9 to leave the room.
 *
 * Unattended round. Every name checked free before drawing.
 */
import { arc, col, disc, poly, raw, rect, row } from "../forms.ts";
import { folder, ring } from "../bodies.ts";
import { SMALL, remove } from "../marks.ts";
import type { Icon } from "../build.ts";

const HEART = "a heart is one line, not three strokes with visible seams";
const figure = () => [disc(9, 8, 3), arc(9, 21, 6, 180, 360)];

const fold = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "file", name, description, tags, family: "folder", aliases, keywords,
  shapes: [folder(), ...marks],
});
const person = (slug: string, name: string, description: string, tags: string[], aliases: string[], keywords: string[], marks: Icon["shapes"]): Icon => ({
  slug, category: "interface", subcategory: "identity", name, description, tags, family: "figure", aliases, keywords,
  shapes: [...figure(), ...marks],
});

export const BATCH_78: Icon[] = [
  // ── folder ──────────────────────────────────────────────────────────────────────
  fold("folder-remove", "Folder remove", "A folder with a minus on it — take this folder out, drop it and what it holds",
    ["minus", "drop", "delete"], ["folder-minus"], ["remove folder", "delete directory", "drop folder"], remove(SMALL, 13)),
  fold("folder-search", "Folder search", "A folder with a magnifying glass on it — search inside this folder for a file",
    ["find", "lookup", "inside"], ["folder-search-2"], ["search folder", "find in directory", "locate file"],
    [disc(11.5, 13, 3), poly([[13.5, 15], [16, 17.5]])]),
  fold("folder-lock", "Folder lock", "A folder with a padlock on it — a locked folder, its contents kept from everyone else",
    ["locked", "private", "restricted"], [], ["locked folder", "private directory", "restricted folder"],
    [poly([[9, 12], [15, 12], [15, 17], [9, 17]], true), arc(12, 12, 2, 180, 360)]),
  fold("folder-key", "Folder key", "A folder with a key on it — the folder where keys and credentials are kept",
    ["credential", "secret", "keys"], [], ["key folder", "credentials directory", "secrets folder"],
    [disc(10, 13, 2), row(13, 12, 15.5), col(14.5, 13, 15.5)]),
  fold("folder-code", "Folder code", "A folder with angle brackets on it — a source folder, where the code lives",
    ["source", "src", "brackets"], [], ["source folder", "code directory", "src"],
    [poly([[10.5, 10], [8, 12.5], [10.5, 15]]), poly([[13.5, 10], [16, 12.5], [13.5, 15]])]),
  fold("folder-config", "Folder config", "A folder with sliders on it — a folder of settings, the configuration a project reads",
    ["settings", "sliders", "options"], ["folder-cog", "folder-cog-2"], ["config folder", "settings directory", "dotfiles"],
    [row(11, 9, 15), col(13.5, 9, 13), row(15, 9, 15), col(10.5, 13, 17)]),
  fold("folder-git", "Folder git", "A folder with a branch on it — a repository, a folder under version control",
    ["repository", "repo", "version-control"], ["folder-git-2"], ["git folder", "repository directory", "repo"],
    [col(9.5, 9.5, 18), disc(9.5, 9.5, 1), disc(14.5, 11, 1), poly([[14.5, 13], [9.5, 18]])]),
  fold("folder-tree", "Folder tree", "A folder with a tree of lines on it — the directory tree, folders nested inside folders",
    ["hierarchy", "nested", "directory"], [], ["directory tree", "folder hierarchy", "nested folders"],
    [col(9, 10, 17), row(13, 9, 14), row(17, 9, 14)]),
  fold("folder-root", "Folder root", "A folder with a slash on it — the root folder, the top of the tree everything hangs from",
    ["top", "slash", "base"], [], ["root directory", "top-level folder", "project root"],
    [poly([[9.5, 16.5], [14.5, 11.5]])]),
  fold("folder-sync", "Folder sync", "A folder with two arrows on it — keep this folder in step with its copy elsewhere",
    ["mirror", "copy", "in-step"], [], ["sync folder", "mirrored directory", "synced folder"],
    [row(11.5, 9, 14.5), poly([[12.5, 9.5], [14.5, 11.5], [12.5, 13.5]]), row(15, 9.5, 15), poly([[11.5, 13], [9.5, 15], [11.5, 17]])]),
  fold("folder-clock", "Folder clock", "A folder with a clock on it — a folder's history, recent folders or one that expires",
    ["history", "recent", "expires"], [], ["recent folders", "folder history", "expiring folder"],
    [disc(12, 13, 3), poly([[12, 10.5], [12, 13], [14.5, 13]])]),
  fold("folder-input", "Folder input", "A folder with an arrow going in — files moved into this folder, an input directory",
    ["into", "import", "incoming"], [], ["input folder", "import directory", "incoming files"],
    [row(13, 2, 11), poly([[8.5, 10.5], [11, 13], [8.5, 15.5]])]),
  fold("folder-output", "Folder output", "A folder with an arrow pointing right inside it — files produced into this folder, an output directory",
    ["out", "export", "build"], [], ["output folder", "export directory", "build folder", "dist"],
    [row(13, 9, 14), poly([[12.5, 10.5], [15, 13], [12.5, 15.5]])]),
  fold("folder-up", "Folder up", "A folder with an arrow pointing up on it — upload this folder, send the whole directory",
    ["upload", "send", "parent"], [], ["upload folder", "send directory", "parent folder"],
    [col(12, 10, 16.5), poly([[9.5, 12.5], [12, 10], [14.5, 12.5]])]),
  fold("folder-down", "Folder down", "A folder with an arrow pointing down on it — download this folder, fetch the whole directory",
    ["download", "fetch", "save"], [], ["download folder", "fetch directory", "save folder"],
    [col(12, 10, 16.5), poly([[9.5, 14], [12, 16.5], [14.5, 14]])]),
  fold("folder-edit", "Folder edit", "A folder with a pencil on it — rename this folder or change what is inside it",
    ["pencil", "rename", "modify"], ["folder-pen"], ["edit folder", "rename directory", "modify folder"],
    [poly([[8.5, 17], [8.5, 14.5], [13.5, 9.5], [16, 12], [11, 17]], true)]),
  fold("folder-archive", "Folder archive", "A folder with a box on it — an archived folder, zipped up and put away",
    ["zip", "stored", "packed"], [], ["archive folder", "zipped directory", "archived files"],
    [rect(8.5, 10, 7, 7, 2), row(13.5, 8.5, 15.5)]),
  fold("folder-heart", "Folder heart", "A folder with a heart on it — a favourite folder, kept where it is easy to reach",
    ["favourite", "starred", "pinned"], [], ["favourite folder", "starred directory", "liked folder"],
    [raw("M8.5 12A1.75 1.75 0 0 1 12 12A1.75 1.75 0 0 1 15.5 12L12 15.5Z", HEART, true)]),
  fold("folder-dot", "Folder dot", "A folder with a dot on it — a folder with something new in it, unread or changed",
    ["unread", "new", "changed"], ["folder-open-dot"], ["folder with changes", "unread folder", "new files"],
    [disc(12, 13, 2)]),
  fold("folder-symlink", "Folder symlink", "A folder with a bent arrow on it — a link to a folder that really lives somewhere else",
    ["link", "alias", "shortcut"], [], ["symlinked folder", "folder alias", "linked directory"],
    [poly([[9, 17], [14, 12]]), poly([[10.5, 11.5], [14.5, 11.5], [14.5, 15.5]])]),
  fold("folder-kanban", "Folder kanban", "A folder with three columns on it — a folder of work in progress, sorted into lanes",
    ["board", "lanes", "columns"], [], ["kanban folder", "board directory", "project lanes"],
    [col(9, 10, 17), col(12, 10, 14), col(15, 10, 15)]),

  // ── user ────────────────────────────────────────────────────────────────────────
  person("user-remove", "User remove", "A person with a minus beside them — take this user out, remove them from the group",
    ["minus", "delete", "leave"], ["user-minus", "user-round-minus", "user-minus-2"], ["remove user", "delete account", "leave group"],
    [row(12, 15, 21)]),
  person("user-config", "User config", "A person with sliders beside them — this user's settings and preferences",
    ["settings", "preferences", "sliders"], ["user-cog", "user-cog-2", "user-round-cog"], ["user settings", "account preferences", "profile settings"],
    [row(10.5, 15, 21), col(19, 8.5, 12.5), row(14.5, 15, 21), col(17, 12.5, 16.5)]),
  person("user-key", "User key", "A person with a key beside them — this user's credential, the key that signs them in",
    ["credential", "login", "access"], ["user-round-key"], ["user credential", "account key", "login key"],
    [disc(17, 10, 2), col(17, 12, 16.5), row(14.5, 17, 19.5)]),
  person("user-lock", "User lock", "A person with a padlock beside them — a locked account, sign-in held until it is unlocked",
    ["locked", "suspended", "secured"], [], ["locked account", "suspended user", "secured profile"],
    [rect(14.5, 12, 7, 6.5, 2), arc(18, 12, 2, 180, 360)]),
  person("user-search", "User search", "A person with a magnifying glass beside them — find a user, look someone up",
    ["find", "lookup", "directory"], ["user-round-search"], ["find user", "search people", "look up account"],
    [disc(17.5, 11.5, 3), poly([[19.5, 13.5], [21.5, 15.5]])]),
  person("user-edit", "User edit", "A person with a pencil beside them — edit this user's profile and details",
    ["pencil", "profile", "modify"], ["user-pen", "user-round-pen"], ["edit profile", "edit user", "update account"],
    [poly([[14.5, 16.5], [14.5, 14], [19.5, 9], [22, 11.5], [17, 16.5]], true)]),
  person("user-heart", "User heart", "A person with a heart beside them — a favourite user, someone followed or starred",
    ["favourite", "followed", "starred"], ["user-star"], ["favourite user", "starred person", "followed account"],
    [raw("M14.5 11A1.75 1.75 0 0 1 18 11A1.75 1.75 0 0 1 21.5 11L18 14.5Z", HEART, true)]),
  person("user-shield", "User shield", "A person with a shield beside them — a protected user, an account under guard",
    ["protected", "guarded", "secure"], [], ["protected user", "guarded account", "user security"],
    [poly([[15.5, 9], [20.5, 9], [20.5, 13], [18, 15.5], [15.5, 13]], true)]),
  person("user-back", "User back", "A person with an arrow pointing back beside them — a returning user, or hand them back",
    ["return", "previous", "returning"], ["user-round-arrow-left"], ["returning user", "previous user", "user back"],
    [row(12, 15, 21), poly([[17, 9.5], [14.5, 12], [17, 14.5]])]),
  {
    slug: "user-circle", category: "interface", subcategory: "identity",
    name: "User circle", description: "A person inside a circle — an account avatar, the placeholder where a photo would go",
    tags: ["avatar", "account", "placeholder"], family: "orbit",
    aliases: ["circle-user", "user-circle-2"], keywords: ["avatar", "account icon", "profile circle", "placeholder avatar"],
    shapes: [ring(), disc(12, 9.5, 3), arc(12, 19.5, 6, 180, 360)],
  },
  {
    slug: "user-square", category: "interface", subcategory: "identity",
    name: "User square", description: "A person inside a square — an ID card avatar, the badge photo of an account",
    tags: ["avatar", "badge", "card"], family: "window",
    aliases: ["square-user", "user-square-2"], keywords: ["square avatar", "id photo", "badge avatar", "profile card"],
    shapes: [rect(3, 3, 18, 18, 2), disc(12, 9.5, 2), arc(12, 19, 5, 180, 360)],
  },
];
