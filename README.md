# The Essential 36

A focused interview study guide with 36 detailed questions about machine learning, medical imaging, computer vision, model evaluation, edge deployment, and research projects.

**Live site:** https://prathmesh333.github.io/ML-Data-Questions/

## Topics

- Vyuhaa Med Data role and practical diagnostic workflows
- Image preprocessing, OpenCV, whole-slide images, and patient-level splits
- Few-shot learning, feature selection, PCA, XGBoost, and feature importance
- Overfitting, imbalanced data, metrics, calibration, and domain shift
- CNNs, ResNet, U-Net, PyTorch, losses, and debugging
- GPU profiling, quantization, export, and edge reliability
- HQDE, EvidenceMem, PsychoTA, and TRACE

Every question includes a detailed answer, technical reasoning, answered follow-ups, and an important distinction or limitation.

## Use

Open the live site or open `index.html` locally. No installation or build step is required. Keep `index.html`, `styles.css`, `content.js`, and `app.js` together.

Use topic filters and search to focus. Press `/` to focus search. Mark questions reviewed after you can explain the answer. Progress stays in your browser when local storage is available. Printing includes answers for the currently selected questions.

## Evidence and limits

These are preparation predictions, not a verified list of questions asked in previous interviews. One scenario paraphrases an older public Vyuhaa screening form. The website includes source links and evidence limits.

Project answers use the author's available dissertation, project documentation, and résumés. Settings that were not verified are marked for confirmation. Proposed improvements are not presented as completed results. This guide is not affiliated with Vyuhaa Med Data.

## GitHub Pages

The static site is published from the root of the `main` branch. `.nojekyll` disables Jekyll processing. Updating the source files on `main` updates the site through GitHub Pages.

## Checks

```sh
node --check app.js
node --check content.js
```

The application uses plain HTML, CSS, and JavaScript. It includes no analytics, external scripts, external fonts, or model calls. Reference links require internet access; the study content does not.
