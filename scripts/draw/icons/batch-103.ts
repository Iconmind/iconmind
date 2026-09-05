/**
 * R16 · AI: multimodal, speech & vision — what a model does with a picture, a recording,
 * a video, or a shape.
 *
 * A picture task sits in the photo frame `image` draws, with what the model found in it.
 * A video task sits in the camcorder `video` draws. A speech task sits in the speech
 * bubble `message` draws — a recording is something said. A shape is the cube. What routes
 * between modalities is the machine.
 */
import { arc, col, disc, frame, poly, raw, rect, row } from "../forms.ts";
import { machine } from "../bodies.ts";
import { SMALL, clockMark, searchMark } from "../marks.ts";
import type { Icon } from "../build.ts";

const c = (
  slug: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[],
  family: string, shapes: Icon["shapes"],
): Icon => ({
  slug, category: "ai", subcategory: "multimodal", name, description,
  tags, aliases, keywords, family, shapes,
});

/** The photo frame `image` draws. The picture is x 4..20, y 5..19; marks at cy 12. */
const PHOTO = () => frame(3, 4, 18, 16, 3, { gap: 4 });
/** The camcorder `video` draws. The picture is x 3..15, y 7..17 — off centre, so no locked marks. */
const CAM = () => [frame(2, 6, 14, 12, 3, { gap: 3 }), poly([[19, 10], [22, 7], [22, 17], [19, 14]], true)];
/** The speech bubble `message` draws. The hollow is x 3..21, y 5..16; marks at cy 10.5. */
const BUBBLE = () => [frame(2, 4, 20, 13, 3, { gap: 4 }), poly([[7, 17], [7, 21], [11, 17]])];
/** An isometric cube, every edge on 45° or 90°, drawn as one path so its joins are joins. */
const CUBE = () => raw("M12 2L18 8V16L12 22L6 16V8ZM6 8L12 14L18 8M12 14V22", "a cube: a hexagon and the three edges that meet in its middle");
/** The cube's outline alone. */
const HEX = () => raw("M12 2L18 8V16L12 22L6 16V8Z", "the cube's outline, a hexagon", true);
/** A hill: the subject a picture is of. */
const HILL = (x: number, y: number) => poly([[x, y], [x + 4, y - 4], [x + 8, y]]);
/** The set's bolt, 2.5 wide, with its top-right corner at (x, y). */
const BOLT = (x: number, y: number) => poly([[x, y], [x - 2.5, y + 2.5], [x, y + 2.5], [x - 2.5, y + 5]]);

export const BATCH_103: Icon[] = [
  /* ── In the picture ───────────────────────────────────────────────────────────── */
  c("image-segment", "Image segmentation", "The photo frame with a hill and a corner picked out — every pixel given to the thing it belongs to",
    ["image", "segment", "vision"], [], ["image segmentation", "semantic segmentation", "pixel labels", "segment image"],
    "window", [PHOTO(), HILL(6, 17), poly([[14.5, 7], [18, 7], [18, 10.5]])]),
  c("ocr-extract", "OCR extraction", "The photo frame with lines of text in it — the words read off a picture",
    ["image", "ocr", "text"], [], ["ocr extraction", "read text from image", "optical character recognition", "extract text"],
    "window", [PHOTO(), row(9, 7, 17), row(12.5, 7, 14), row(16, 7, 17)]),
  c("document-layout", "Document layout", "The photo frame with a title and two columns — where the blocks of a page are",
    ["image", "document", "layout"], [], ["document layout", "layout analysis", "page blocks", "reading order"],
    "window", [PHOTO(), row(8, 7, 17), col(9, 11, 17), col(15, 11, 17)]),
  c("table-extract-ai", "Table extraction", "The photo frame with a grid in it — rows and cells pulled out of a picture of a table",
    ["image", "table", "extract"], [], ["table extraction", "extract table from image", "table recognition", "cells from scan"],
    "window", [PHOTO(), row(10, 6, 18), row(14, 6, 18), col(12, 7, 17)]),
  c("chart-understand", "Chart understanding", "The photo frame with bars in it — a chart read for what it says",
    ["image", "chart", "understand"], [], ["chart understanding", "read a chart", "chart qa", "plot to data"],
    "window", [PHOTO(), col(8, 11, 16), col(12, 9, 16), col(16, 13, 16)]),
  c("face-blur", "Face blur", "The photo frame with a head over a blur — a face hidden before the picture is shared",
    ["image", "face", "privacy"], [], ["face blur", "blur faces", "anonymise faces", "face redaction"],
    "window", [PHOTO(), disc(12, 10, 2), poly([[8, 16], [10.5, 13.5], [13, 16], [15.5, 13.5]])]),
  c("image-edit", "Image edit", "The photo frame with a pencil across it — a picture changed by instruction",
    ["image", "edit", "generate"], [], ["image edit", "edit image", "instruct edit", "retouch"],
    "window", [PHOTO(), poly([[8, 16], [15, 9]]), poly([[15, 9], [17, 11]])]),
  c("upscale-image", "Upscale image", "The photo frame with a small picture and an arrow to the corner — more pixels than it came with",
    ["image", "upscale", "resolution"], [], ["upscale image", "super resolution", "enlarge image", "4x upscale"],
    "window", [PHOTO(), rect(6, 10.5, 6.5, 6.5, 2), poly([[13, 11], [17, 7]]), poly([[14.5, 7], [17, 7], [17, 9.5]])]),
  c("depth-map", "Depth map", "The photo frame with lines that widen as they come nearer — how far away each part is",
    ["image", "depth", "3d"], [], ["depth map", "depth estimation", "monocular depth", "distance per pixel"],
    "window", [PHOTO(), row(8, 10, 14), row(12, 8, 16), row(16, 6, 18)]),
  c("image-mask", "Image mask", "The photo frame with a region and its centre marked — the part of a picture a step applies to",
    ["image", "mask", "region"], [], ["image mask", "mask region", "paint mask", "masked area"],
    "window", [PHOTO(), rect(7, 8, 10, 8, 2), disc(12, 12, 1)]),
  c("segment-anything", "Segment anything", "The photo frame with a point inside a mask — click once, get the thing around it",
    ["image", "segment", "click"], [], ["segment anything", "sam", "click to segment", "promptable segmentation"],
    "window", [PHOTO(), poly([[8, 10], [12, 6], [16, 10], [16, 14], [12, 18], [8, 14]], true), disc(12, 12, 1)]),
  c("keypoint", "Keypoints", "The photo frame with points where the joints are — a body reduced to the places that move",
    ["image", "keypoint", "pose"], [], ["keypoints", "keypoint detection", "landmarks", "joints"],
    "window", [PHOTO(), disc(12, 8.5, 1), disc(8.5, 12, 1), disc(15.5, 12, 1), disc(10, 16.5, 1), disc(14, 16.5, 1)]),
  c("background-remove", "Background removal", "The photo frame with a hill and the sky crossed out — the subject kept, the rest dropped",
    ["image", "background", "cutout"], [], ["background removal", "remove background", "cutout", "transparent background"],
    "window", [PHOTO(), HILL(6, 17), poly([[15, 7], [19, 11]]), poly([[19, 7], [15, 11]])]),
  c("aspect-crop", "Aspect crop", "The photo frame with a wide box inside it — a picture cut to the shape a place needs",
    ["image", "crop", "aspect"], [], ["aspect crop", "crop to ratio", "16:9 crop", "smart crop"],
    "window", [PHOTO(), rect(6, 8, 12, 8, 2)]),
  c("thumbnail-pick", "Thumbnail pick", "The photo frame with a small picture ticked — the one frame chosen to stand for the rest",
    ["image", "thumbnail", "pick"], [], ["thumbnail pick", "choose thumbnail", "best frame", "cover image"],
    "window", [PHOTO(), rect(7, 8, 10, 8, 2), poly([[9, 12], [11, 14], [15, 10]])]),
  c("image-to-text", "Image to text", "The photo frame with a small hill over lines of text — a picture described in words",
    ["image", "text", "caption"], [], ["image to text", "describe image", "image description", "alt text"],
    "window", [PHOTO(), HILL(6, 10), row(13.5, 7, 17), row(16.5, 7, 13)]),

  /* ── In the video ─────────────────────────────────────────────────────────────── */
  c("video-summarise", "Video summary", "The camcorder with two lines in it — a long recording told in a few sentences",
    ["video", "summary", "understand"], [], ["video summary", "summarise video", "video recap", "video understanding"],
    "window", [...CAM(), row(10, 5, 13), row(14, 5, 10)]),
  c("video-caption", "Video caption", "The camcorder with a line along the bottom — words for what is being said and seen",
    ["video", "caption", "subtitle"], [], ["video caption", "auto captions", "closed captions", "caption generation"],
    "window", [...CAM(), row(15, 5, 13)]),
  c("frame-extract", "Frame extraction", "The camcorder with one frame pulled out — a single still taken from the stream",
    ["video", "frame", "extract"], [], ["frame extraction", "extract frames", "grab a frame", "sample frames"],
    "window", [...CAM(), poly([[6, 9], [6, 15], [12, 15], [12, 9]], true)]),
  c("scene-detect", "Scene detection", "The camcorder with two cuts across it — where one scene ends and the next begins",
    ["video", "scene", "detect"], [], ["scene detection", "scene change", "split into scenes", "chapter detection"],
    "window", [...CAM(), col(7, 8, 16), col(11, 8, 16)]),
  c("shot-boundary", "Shot boundary", "The camcorder with one cut across it — the frame where the camera changed",
    ["video", "shot", "boundary"], [], ["shot boundary", "shot detection", "cut detection", "hard cut"],
    "window", [...CAM(), col(9, 8, 16)]),
  c("video-generate", "Video generation", "The camcorder with a bolt in it — moving pictures made from a prompt",
    ["video", "generate", "model"], [], ["video generation", "text to video model", "generate clip", "ai video"],
    "window", [...CAM(), BOLT(10.5, 9.5)]),
  c("lip-sync-ai", "Lip sync", "The camcorder with lips in it — a mouth moved to match the words",
    ["video", "lip-sync", "speech"], [], ["lip sync", "lip synchronisation", "mouth to audio", "dubbing sync"],
    "window", [...CAM(), row(11, 6, 12), arc(9, 11, 3, 0, 180)]),
  c("motion-transfer", "Motion transfer", "The camcorder with a stick figure in it — one body's movement given to another",
    ["video", "motion", "transfer"], [], ["motion transfer", "motion capture transfer", "animate from video", "pose transfer"],
    "window", [...CAM(), disc(9, 9, 1), col(9, 10, 13.5), poly([[6.5, 16], [9, 13.5], [11.5, 16]])]),
  c("video-track", "Video tracking", "The camcorder with a subject and its trail — the same thing followed frame to frame",
    ["video", "track", "object"], [], ["video tracking", "object tracking", "track across frames", "multi-object tracking"],
    "window", [...CAM(), disc(7.5, 12, 2), row(12, 10, 14)]),
  c("subtitle-burn", "Burn-in subtitles", "The camcorder with a solid bar in it — subtitles drawn into the frames themselves",
    ["video", "subtitle", "burn-in"], [], ["burn-in subtitles", "hardcoded subtitles", "open captions", "render subtitles"],
    "window", [...CAM(), rect(5, 11, 8, 4, 2)]),
  c("frame-interpolate", "Frame interpolation", "The camcorder with a point between two frames — a frame made up to sit between real ones",
    ["video", "frame", "interpolate"], [], ["frame interpolation", "motion interpolation", "60fps from 30", "in-between frames"],
    "window", [...CAM(), col(6, 9, 15), col(12, 9, 15), disc(9, 12, 1)]),
  c("render-queue", "Render queue", "The camcorder with frames lined up in it — clips waiting their turn to be rendered",
    ["video", "render", "queue"], [], ["render queue", "render jobs", "waiting to render", "encode queue"],
    "window", [...CAM(), col(6, 9, 15), col(9, 9, 15), col(12, 9, 15)]),

  /* ── In the bubble ────────────────────────────────────────────────────────────── */
  c("wake-word", "Wake word", "A speech bubble with a bolt in it — the one word that wakes the device",
    ["speech", "wake-word", "voice"], [], ["wake word", "hotword", "hey assistant", "keyword spotting"],
    "window", [...BUBBLE(), BOLT(13.5, 8)]),
  c("audio-transcribe", "Audio transcription", "A speech bubble with lines of text in it — what was said, written down",
    ["speech", "transcribe", "text"], [], ["audio transcription", "transcribe audio", "speech recognition", "asr"],
    "window", [...BUBBLE(), row(8, 6, 18), row(12, 6, 14)]),
  c("audio-timestamp", "Audio timestamps", "A speech bubble with a clock in it — each word tied to the second it was said",
    ["speech", "timestamp", "align"], [], ["audio timestamps", "word timestamps", "time-aligned transcript", "timecodes"],
    "window", [...BUBBLE(), ...clockMark(SMALL, 10.5)]),
  c("noise-suppress", "Noise suppression", "A speech bubble with a wave and a cross — the background taken out of the voice",
    ["speech", "noise", "clean"], [], ["noise suppression", "background noise removal", "denoise voice", "clean audio"],
    "window", [...BUBBLE(), poly([[6.5, 11.5], [9, 9], [11.5, 11.5]]), poly([[13.5, 8], [17.5, 12]]), poly([[17.5, 8], [13.5, 12]])]),
  c("audio-embed", "Audio embedding", "A speech bubble with an arrow in it — a recording turned into a vector",
    ["speech", "embedding", "vector"], [], ["audio embedding", "audio vector", "sound embedding", "clap embedding"],
    "window", [...BUBBLE(), poly([[8, 13], [13, 8]]), poly([[10.5, 8], [13, 8], [13, 10.5]])]),
  c("music-generate", "Music generation", "A speech bubble with a note in it — music made from a description",
    ["audio", "music", "generate"], [], ["music generation", "generate music", "text to music", "ai music"],
    "window", [...BUBBLE(), disc(10.5, 12, 2), col(12.5, 6, 12), poly([[12.5, 6], [15, 8.5]])]),
  c("audio-to-text", "Audio to text", "A speech bubble with a wave that becomes a line — sound turned into words",
    ["speech", "text", "convert"], [], ["audio to text", "speech to text", "voice to text", "dictation"],
    "window", [...BUBBLE(), poly([[6, 10.5], [8.5, 8], [11, 10.5]]), row(10.5, 13, 18)]),
  c("audio-encoder", "Audio encoder", "A speech bubble with a tag around a point — the part of the model that hears",
    ["speech", "encoder", "model"], [], ["audio encoder", "speech encoder", "whisper encoder", "audio tower"],
    "window", [...BUBBLE(), poly([[8.5, 8], [6, 10.5], [8.5, 13]]), poly([[15.5, 8], [18, 10.5], [15.5, 13]]), disc(12, 10.5, 1)]),
  c("audio-diarise", "Audio diarisation", "A speech bubble with a recording cut in two — where one voice stops and another starts",
    ["speech", "diarise", "segment"], [], ["audio diarisation", "speaker segmentation", "who spoke when", "speaker turns"],
    "window", [...BUBBLE(), row(10.5, 5.5, 9), col(12, 7.5, 13.5), row(10.5, 15, 18.5)]),
  c("speaker-diarise", "Speaker diarisation", "A speech bubble with two heads in it — each stretch of speech given to its speaker",
    ["speech", "speaker", "diarise"], [], ["speaker diarisation", "speaker labels", "two speakers", "speaker identification"],
    "window", [...BUBBLE(), disc(9, 10.5, 2), disc(15, 10.5, 2)]),
  c("audio-vad", "Voice activity detection", "A speech bubble with silence, a burst, and silence — where in the recording someone is speaking",
    ["speech", "vad", "detect"], [], ["voice activity detection", "vad", "speech detection", "silence trimming"],
    "window", [...BUBBLE(), row(10.5, 5.5, 8.5), poly([[9.5, 12.5], [12, 10], [14.5, 12.5]]), row(10.5, 15.5, 18.5)]),
  c("speech-align", "Speech alignment", "A speech bubble with a line and ticks under it — each word matched to its moment in the audio",
    ["speech", "align", "forced"], [], ["speech alignment", "forced alignment", "word alignment", "align transcript"],
    "window", [...BUBBLE(), row(8, 7, 17), col(9, 11, 14), col(12, 11, 14), col(15, 11, 14)]),
  c("phoneme", "Phonemes", "A speech bubble with a zigzag in it — speech broken into its smallest sounds",
    ["speech", "phoneme", "sound"], [], ["phonemes", "phoneme recognition", "grapheme to phoneme", "ipa"],
    "window", [...BUBBLE(), poly([[7, 12], [9.5, 9.5], [12, 12], [14.5, 9.5], [17, 12]])]),
  c("prosody", "Prosody", "A speech bubble with a pitch line that rises — the tune of how something is said",
    ["speech", "prosody", "intonation"], [], ["prosody", "intonation", "pitch contour", "stress and rhythm"],
    "window", [...BUBBLE(), poly([[7, 12], [11, 12], [15, 8], [17.5, 8]])]),
  c("voice-preset", "Voice preset", "A speech bubble with a saved pill in it — a voice chosen from the ones on offer",
    ["speech", "voice", "preset"], [], ["voice preset", "voice selection", "tts voice", "saved voice"],
    "window", [...BUBBLE(), rect(8, 8.5, 8, 4, 2)]),
  c("cross-modal-search", "Cross-modal search", "A speech bubble with a lens in it — a search that reads what was said and shown alike",
    ["search", "cross-modal", "retrieval"], [], ["cross-modal search", "search images with text", "multimodal retrieval", "clip search"],
    "window", [...BUBBLE(), ...searchMark(SMALL, 10.5)]),
  c("multimodal-prompt", "Multimodal prompt", "A speech bubble with a picture and words in it — a prompt that carries more than text",
    ["prompt", "image", "text"], [], ["multimodal prompt", "image in prompt", "vision prompt", "attach image to prompt"],
    "window", [...BUBBLE(), HILL(5, 13.5), row(9, 14, 18), row(12.5, 14, 18)]),

  /* ── Between modalities ───────────────────────────────────────────────────────── */
  c("modality-router", "Modality router", "A machine frame with one line splitting into two — each input sent to the model that handles its kind",
    ["router", "modality", "model"], [], ["modality router", "route by input type", "text or image", "input dispatch"],
    "machine", [machine(), poly([[7, 12], [10, 12], [13, 9], [16, 9]]), poly([[10, 12], [13, 15], [16, 15]])]),
  c("modality-mix", "Modality mix", "A machine frame with two lines joining into one — text, image and sound taken in together",
    ["mix", "modality", "fusion"], [], ["modality mix", "modality fusion", "combine inputs", "early fusion"],
    "machine", [machine(), poly([[8, 9], [11, 9], [14, 12], [17, 12]]), poly([[8, 15], [11, 15], [14, 12]])]),

  /* ── In three dimensions ──────────────────────────────────────────────────────── */
  c("three-d-generate", "3D generation", "A cube — an object made in three dimensions from a prompt or a picture",
    ["3d", "generate", "shape"], [], ["3d generation", "text to 3d", "image to 3d", "generate object"],
    "cube", [CUBE()]),
  c("mesh-generate", "Mesh generation", "The cube's outline with a vertex at its heart — a surface built from points and faces",
    ["3d", "mesh", "geometry"], [], ["mesh generation", "generate mesh", "polygon mesh", "3d reconstruction"],
    "cube", [HEX(), disc(12, 14, 2)]),
  c("texture-generate", "Texture generation", "The cube's outline hatched — the surface a shape is dressed in",
    ["3d", "texture", "material"], [], ["texture generation", "generate texture", "pbr texture", "material synthesis"],
    "cube", [HEX(), poly([[7, 12], [11, 8]]), poly([[9, 15], [15, 9]]), poly([[12, 17], [17, 12]])]),
];
