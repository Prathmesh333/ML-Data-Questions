const STUDY_QUESTIONS = [
  {
    "group": "Company & workflow",
    "level": "Basic",
    "title": "What does Vyuhaa do, and why does your experience fit this role?",
    "answer": [
      "Vyuhaa builds AI systems for digital pathology, microscopy image analysis, and cancer screening. Its role post emphasizes computer vision, medical imaging, and inference on resource-constrained devices. The role combines model development with engineering that makes a model reliable outside a notebook.",
      "I would connect that scope to my PyTorch image experiments in HQDE and my representation and retrieval experiments in EvidenceMem. I can discuss data pipelines, controlled comparisons, error analysis, and resource trade-offs. I would also state that these projects do not establish clinical experience or medical-model validation."
    ],
    "sections": [
      [
        "How to introduce yourself",
        "“I completed my M.Tech in IT at the University of Hyderabad. My dissertation studied distributed image-model training and model-update compression. I also built a compact classification memory over frozen CLIP embeddings. I want to apply these skills to practical medical computer vision and learn how engineers and pathologists evaluate real failures.”"
      ],
      [
        "What the role adds",
        "A pathology platform must handle poor images, uncertain labels, rare findings, and device limits. Prepare to explain how you would identify failures, measure them, and propose an experiment. State your actual on-site availability and commitment."
      ]
    ],
    "follow": [
      [
        "Why an internship after an M.Tech?",
        "Explain that you want practical responsibility with medical data, deployment constraints, and technical feedback. Connect that goal to a concrete contribution, such as reproducing a baseline or improving a data-quality check."
      ]
    ],
    "mistake": "Do not claim to know the company’s internal model architecture. Public product descriptions establish scope, not implementation.",
    "source": "Current role post supplied in chat; Vyuhaa product page; your research résumé.",
    "id": "essential-01"
  },
  {
    "group": "Company & workflow",
    "level": "Intermediate",
    "title": "How would you build a model from a new medical-image dataset?",
    "answer": [
      "I would first define the output and the unit of prediction. A cell label, segmentation mask, slide prediction, and patient result require different labels and evaluation. I would clarify who produced the annotations and whether they are reliable enough for the task.",
      "Next, I would inspect image quality, class and patient counts, acquisition sources, duplicates, and missing labels. I would separate patients before preparing patches. I would train a simple baseline with a reproducible pipeline, inspect errors, and only then add complexity."
    ],
    "sections": [
      [
        "Prepare the data",
        "Create a metadata table with patient ID, slide ID, image path, label, source, split, and acquisition scale when available. Retain patch coordinates and parent-slide information. Fit any learned preprocessing only on the training partition."
      ],
      [
        "Choose the baseline",
        "Use a pretrained image classifier for labelled patches, a segmentation model for masks, or a slide-level aggregation approach when only slide labels exist. Match the loss to the output."
      ],
      [
        "Evaluate and improve",
        "Measure the intended decision level. Inspect false negatives and false positives across sources. Compare a targeted change against the same baseline protocol. Measure device performance after the prediction pipeline is established."
      ]
    ],
    "follow": [
      [
        "Why not start with the largest model?",
        "A simple baseline reveals data and label failures sooner. A larger model increases compute and tuning cost and can overfit limited data. Complexity needs a measured benefit."
      ]
    ],
    "mistake": "Do not interpret patch accuracy as patient-level performance.",
    "source": "Role-based preparation prediction",
    "id": "essential-02"
  },
  {
    "group": "Data & computer vision",
    "level": "Intermediate",
    "title": "How do you organize image data and prevent patient-level leakage?",
    "answer": [
      "Medical images have a hierarchy: patient, slide, patch, and sometimes individual cell. Samples within that hierarchy are related. A random patch split can place near-identical content from one slide into both training and testing.",
      "I would group by patient before splitting and keep related slides and patches together. Then I would audit exact and near duplicates and examine whether metadata, filenames, or acquisition sources reveal the label."
    ],
    "sections": [
      [
        "Metadata model",
        "Each patch should retain its patient, slide, coordinates, physical scale, label provenance, and split. This supports reconstruction, error analysis, and reproducibility. Keep identifying information out of model inputs unless explicitly required and permitted."
      ],
      [
        "Preprocessing leakage",
        "Fit scalers, imputers, PCA, feature selectors, and other learned transformations inside training folds. Use validation data for model choices and preserve a final test set."
      ],
      [
        "External generalization",
        "A patient-separated split estimates performance on new patients from that sampling setup. If the intended claim concerns a new hospital or scanner, evaluate those sources separately."
      ]
    ],
    "follow": [
      [
        "Are one million patches from 50 patients one million independent examples?",
        "No. Patch counts describe training volume, but patient-level diversity and evaluation uncertainty depend on the independent patients and acquisition sources."
      ]
    ],
    "mistake": "A correct patient split does not rule out every shortcut. Inspect source and annotation artifacts too.",
    "source": "Role-based preparation prediction",
    "id": "essential-03"
  },
  {
    "group": "Data & computer vision",
    "level": "Intermediate",
    "title": "What image preprocessing would you perform with OpenCV?",
    "answer": [
      "I would inspect dimensions, channels, bit depth, image quality, and the model’s input contract. OpenCV commonly loads colour images in BGR order, while many image models expect RGB. I would convert only when the loader and model require it.",
      "I would choose resizing, foreground extraction, denoising, or contrast operations to address a measured problem. I would not automatically apply every enhancement. The processing must preserve cell structures and remain consistent at inference."
    ],
    "sections": [
      [
        "Useful operations",
        "Colour conversion prepares channel order or a suitable colour space. Thresholding can separate foreground when intensity supports it. Opening can remove small foreground regions, while closing can fill gaps. Connected components can measure suitable binary regions."
      ],
      [
        "Quality and focus",
        "Laplacian variance is a simple focus heuristic. Evaluate it on specimen regions and calibrate it against representative sharp and blurry images. Empty regions can score low; noise can score high."
      ],
      [
        "Verify the result",
        "Display before-and-after images. Overlay masks or boxes after transformations. Check intensity ranges, dtype, tensor shape, and channel order. Use appropriate interpolation for categorical masks."
      ]
    ],
    "follow": [
      [
        "Why not divide every image by 255?",
        "That assumes a suitable 8-bit intensity range. Medical images can have different bit depths and processing contracts. Inspect the data and follow the selected model’s requirements."
      ]
    ],
    "mistake": "Denoising and contrast changes can remove useful detail or introduce artifacts.",
    "source": "Role-based preparation prediction",
    "id": "essential-04"
  },
  {
    "group": "Data & computer vision",
    "level": "Advanced",
    "title": "How do whole-slide images, patches, and slide-level labels change model design?",
    "answer": [
      "A whole-slide image can contain much more detail than fits in a model input or device memory. Shrinking the entire slide can remove a small abnormal region. I would identify relevant areas at lower resolution and read suitable higher-resolution patches.",
      "If the only annotation is a slide label, I would not label every patch from a positive slide as positive. Multiple-instance learning can treat a slide as a bag of patch representations and learn an aggregate slide prediction."
    ],
    "sections": [
      [
        "Patch scale",
        "Patch dimensions alone do not define physical context. Pixel spacing, magnification, and scanner characteristics affect what a cell occupies in the image. Choose a scale that preserves the required structures and surrounding context."
      ],
      [
        "Aggregation",
        "Mean pooling can dilute a small positive region. Max pooling can be sensitive to a single false positive. Attention-based aggregation can learn weights, but its attention map does not by itself prove accurate localization."
      ],
      [
        "Practical pipeline",
        "Retain patch coordinates, skip unsuitable regions through a validated quality policy, batch inference within memory limits, and reconstruct outputs at slide level. Evaluate the aggregate result at the required unit."
      ]
    ],
    "follow": [
      [
        "Can a positive slide contain normal patches?",
        "Yes. That is why copying a slide label to every patch creates noisy supervision. The annotation level should control the training method."
      ]
    ],
    "mistake": "A heatmap that looks plausible is not a substitute for localization evaluation.",
    "source": "Role-based preparation prediction",
    "id": "essential-05"
  },
  {
    "group": "ML & feature selection",
    "level": "Intermediate",
    "title": "What would you do with few labelled examples, and what is few-shot learning?",
    "answer": [
      "Few-shot learning concerns adaptation or recognition with a small labelled support set. An N-way K-shot task has N classes and K support examples per class. A separate query set evaluates predictions.",
      "I would first verify labels and independent patient counts. I would compare a frozen pretrained encoder with a simple classifier and limited fine-tuning. A complex few-shot method must beat these baselines under an appropriate evaluation."
    ],
    "sections": [
      [
        "Prototype classification",
        "Encode support examples, average embeddings by class, and compare a query with those class prototypes. This works only when the representation and distance separate the target classes sufficiently."
      ],
      [
        "Other options",
        "Appropriate augmentation can regularize training. Permitted unlabelled images can support representation learning. Active learning can prioritize useful annotations. Pseudo-labels require checks because incorrect predictions can reinforce themselves."
      ],
      [
        "Evaluation",
        "Keep patients separate between support and query sets. Repeat support selections and report variability. Distinguish the number of labels used to construct a representation from the number stored at inference."
      ]
    ],
    "follow": [
      [
        "Is a small stored memory necessarily few-shot learning?",
        "No. EvidenceMem’s default memory was constructed using 45,000 training images, then compressed to 200 representatives. Its separate class-insertion experiment used small support sets."
      ]
    ],
    "mistake": "Augmented copies do not create new independent patients.",
    "source": "Role-based preparation prediction",
    "id": "essential-06"
  },
  {
    "group": "ML & feature selection",
    "level": "Intermediate",
    "title": "How would you reduce features and select the important ones?",
    "answer": [
      "Feature selection retains a subset of original measurements. Dimensionality reduction creates a smaller representation from those measurements. I would choose based on prediction quality, interpretability, and computational cost.",
      "I would first remove identifiers, leakage features, duplicate columns, and constants. Then I would inspect missingness and redundancy and compare selected subsets against a baseline using the same evaluation protocol."
    ],
    "sections": [
      [
        "Three method families",
        "Filter methods include correlation, statistical tests, and mutual information. Wrapper methods train models on different subsets, such as recursive elimination. Embedded methods use the model’s own training, such as L1 regularization or tree-based selection."
      ],
      [
        "Correlated features",
        "High correlation can suggest redundancy but is not an automatic deletion rule. Retain the more reliable or interpretable measurement when appropriate. A feature with weak individual correlation can still help through interactions."
      ],
      [
        "Correct validation",
        "Fit selection within each training fold. Choose the subset using development performance. Compare stability across folds and sources. Keep the final test data out of selection."
      ]
    ],
    "follow": [
      [
        "What if there are 1,000 features and 200 patients?",
        "Use conservative regularized baselines, inspect redundancy, and compare limited selection or reduction. Report uncertainty and prefer a simpler model if added complexity does not give a reliable gain."
      ]
    ],
    "mistake": "Predictive importance does not establish biological causation.",
    "source": "Role-based preparation prediction",
    "id": "essential-07"
  },
  {
    "group": "ML & feature selection",
    "level": "Intermediate",
    "title": "How does PCA reduce dimensions, and when would you use it?",
    "answer": [
      "Principal component analysis finds orthogonal directions with high variance and projects data onto a selected number of those directions. It creates new components rather than selecting original columns.",
      "I would consider PCA for redundant numerical measurements or embeddings when a compact representation is useful. I would compare downstream validation performance and cost instead of assuming variance retention guarantees prediction quality."
    ],
    "sections": [
      [
        "Steps",
        "Centre the features. Scale features with different units when that matches the task. Fit the component directions on training data, choose a candidate dimension, and transform validation and test data with the fitted transformation."
      ],
      [
        "Choosing dimensions",
        "Explained variance gives a useful starting point. The final choice should reflect downstream validation performance, stability, and resource limits. Include the unreduced representation as a baseline."
      ],
      [
        "Limitations",
        "PCA does not use the target. A low-variance direction can contain class information, and a high-variance direction can encode scanner or lighting variation. Components are less interpretable than original measurements."
      ]
    ],
    "follow": [
      [
        "Does 95% explained variance mean 95% useful information?",
        "No. It refers to variance under the fitted representation, not preserved classification accuracy or medical relevance."
      ]
    ],
    "mistake": "Fit PCA inside cross-validation. Fitting it on all images before evaluation leaks information.",
    "source": "Role-based preparation prediction",
    "id": "essential-08"
  },
  {
    "group": "ML & feature selection",
    "level": "Intermediate",
    "title": "How does XGBoost help, and how would you control its overfitting?",
    "answer": [
      "Tree-based XGBoost builds trees sequentially to improve the current ensemble according to a loss and regularized objective. It can capture nonlinear relationships and interactions in structured features.",
      "For microscopy, I could compare it on extracted measurements such as nucleus area and texture, or on image embeddings. For raw images, I would usually establish an image-model baseline because spatial structure matters."
    ],
    "sections": [
      [
        "Training intuition",
        "Under squared-error regression, a new tree can be understood as learning a correction related to residuals. Other objectives use loss derivatives. Do not say that all XGBoost tasks simply predict raw errors."
      ],
      [
        "Regularization",
        "Control depth, minimum child weight, learning rate, row sampling, feature sampling, leaf-weight penalties, and split requirements. Use validation-based early stopping and tune settings together."
      ],
      [
        "Comparison",
        "Random forests build randomized trees largely independently and combine them. Boosting adds trees sequentially. Compare both with a simpler linear baseline on the same splits and metric."
      ]
    ],
    "follow": [
      [
        "Must features be standardized?",
        "Tree splits generally do not require standardization. PCA and many linear or distance-based methods are more sensitive to scales."
      ],
      [
        "Does XGBoost automatically remove unimportant columns?",
        "No. It chooses split features, but a smaller input table requires an explicit selection step and retraining."
      ]
    ],
    "mistake": "Lower learning rate and more trees do not guarantee better generalization.",
    "source": "Role-based preparation prediction",
    "id": "essential-09"
  },
  {
    "group": "ML & feature selection",
    "level": "Advanced",
    "title": "How do feature importance, permutation importance, and SHAP differ?",
    "answer": [
      "Feature importance is model-dependent. A tree’s gain summarizes improvement from splits using a feature. Split frequency counts use, which is a different quantity.",
      "Permutation importance measures a change in model performance after a feature is shuffled. SHAP attributes individual predictions to features relative to a reference baseline. These methods answer different questions and do not prove causation."
    ],
    "sections": [
      [
        "Permutation steps",
        "Measure baseline development performance. Shuffle one feature across examples. Measure the performance change and repeat the shuffle. Interpret the result for the fitted model and selected metric."
      ],
      [
        "Correlation limitation",
        "If two features carry similar information, shuffling one can leave its information available through the other. Rankings can also change across models or folds. Inspect feature groups and stability."
      ],
      [
        "Shortcut example",
        "A scanner identifier can appear important because positive cases came mostly from one site. That is evidence of a possible dataset shortcut, not proof of a useful biological feature."
      ]
    ],
    "follow": [
      [
        "How would you use importance for selection?",
        "Use it to propose a subset, retrain, and validate the subset. Do not drop columns solely because one ranking labels them unimportant."
      ]
    ],
    "mistake": "A schema-valid explanation or attractive plot does not validate the underlying model.",
    "source": "Role-based preparation prediction",
    "id": "essential-10"
  },
  {
    "group": "Training & evaluation",
    "level": "Intermediate",
    "title": "How do you detect overfitting and decide what to change?",
    "answer": [
      "Overfitting occurs when the model fits development examples better than it generalizes. A common signal is improving training performance with worsening validation performance. I would first check that the split and evaluation code are correct.",
      "Then I would inspect errors and compare interventions that match the cause: better independent data, suitable augmentation, lower capacity, transfer learning, weight decay, dropout, or early stopping."
    ],
    "sections": [
      [
        "Learning-curve diagnosis",
        "If both training and validation performance are poor, investigate optimization, labels, preprocessing, and underfitting. Increasing regularization can make that case worse. A large gap suggests a different problem from uniformly poor performance."
      ],
      [
        "Regularization choices",
        "Weight decay discourages large weights through the optimizer update. Dropout randomly removes activations during training. Early stopping selects a checkpoint using validation behaviour. None corrects a leaky split."
      ],
      [
        "Project example",
        "Historical HQDE migration records include very high CIFAR-10 training accuracy and much lower test accuracy. Explain the generalization gap in that setup. Do not attribute it inherently to Ray."
      ]
    ],
    "follow": [
      [
        "Does more augmentation always help?",
        "No. Transformations can change labels, remove small findings, or create unrealistic images. Validate both the images and the model effect."
      ]
    ],
    "mistake": "Repeatedly tuning to a small validation set can overfit the development process itself.",
    "source": "Role-based preparation prediction",
    "id": "essential-11"
  },
  {
    "group": "Training & evaluation",
    "level": "Intermediate",
    "title": "How would you evaluate a model when abnormal cases are rare?",
    "answer": [
      "Accuracy alone can hide a model that predicts the common class. I would report sensitivity, specificity, precision, and the operating threshold, with uncertainty at the relevant evaluation unit.",
      "Sensitivity is TP/(TP+FN). Specificity is TN/(TN+FP). Precision is TP/(TP+FP). The role’s screening context makes missed findings and false-positive review workload central to the discussion."
    ],
    "sections": [
      [
        "Threshold selection",
        "Choose the operating requirements with the domain team. Compare thresholds on validation data, then fix the threshold before final testing. Lowering a threshold for fixed scores cannot reduce recall, but it can increase false positives."
      ],
      [
        "Training imbalance",
        "Compare class-weighted loss or training-set sampling. Oversampling repeatedly exposes the same positive examples, so inspect overfitting. Keep evaluation representative of intended use and explain any altered class distribution."
      ],
      [
        "Numerical example",
        "If 90 abnormal cases are detected, 10 are missed, and 30 normal cases are flagged, recall is 90% and precision is 75%. Specificity requires the number of true negatives."
      ]
    ],
    "follow": [
      [
        "Why can precision change at another site?",
        "Precision depends on the case mix, including prevalence, as well as model behaviour. A threshold validated on one population needs appropriate evaluation in the intended setting."
      ]
    ],
    "mistake": "A good aggregate metric does not establish acceptable false-negative performance.",
    "source": "Role-based preparation prediction",
    "id": "essential-12"
  },
  {
    "group": "Training & evaluation",
    "level": "Advanced",
    "title": "How do you test generalization across hospitals and assess confidence?",
    "answer": [
      "Domain shift means the deployment distribution differs from the development distribution. Scanners, staining, magnification, sample preparation, and populations can change.",
      "I would separate patient-level generalization from source-level generalization. I would inspect source-specific errors and use held-out sites or scanners when the intended claim requires them."
    ],
    "sections": [
      [
        "Discrimination versus calibration",
        "Discrimination concerns separation of outcomes. Calibration concerns whether probability estimates match observed frequencies. A high ROC-AUC does not guarantee calibrated probabilities or a suitable operating threshold."
      ],
      [
        "Confidence checks",
        "Inspect reliability across score ranges and fit any calibration on development data. Measure performance for poor-quality inputs and unfamiliar cases separately. Do not treat softmax confidence as certainty."
      ],
      [
        "Uncertainty",
        "Use repeated runs or appropriate resampling and report variation. Resample independent patients rather than treating correlated patches as independent. Keep model selection separate from final testing."
      ]
    ],
    "follow": [
      [
        "What if a new hospital performs poorly?",
        "First verify preprocessing and acquisition compatibility. Inspect class balance, labels, image quality, and source shifts. Test a targeted correction against a held-out evaluation instead of immediately retraining on all data."
      ]
    ],
    "mistake": "Calibration can change under distribution shift. It does not repair a representation that cannot separate the task.",
    "source": "Role-based preparation prediction",
    "id": "essential-13"
  },
  {
    "group": "Models & PyTorch",
    "level": "Intermediate",
    "title": "Why use CNNs and ResNet, and how do their image features work?",
    "answer": [
      "Convolutional neural networks learn local patterns through shared filters. Deeper layers combine simpler patterns into more task-specific representations. Weight sharing reduces parameters compared with connecting every pixel to every neuron.",
      "ResNet adds residual connections. A block produces F(x)+x when dimensions match. The skip path supports optimization and gradient flow in deeper networks."
    ],
    "sections": [
      [
        "Shapes",
        "For each spatial dimension, output = floor((input + 2×padding − dilation×(kernel−1) − 1)/stride + 1). Input 224, kernel 3, padding 1, stride 2, and dilation 1 gives output 112."
      ],
      [
        "Model choice",
        "Choose capacity, resolution, and pretraining based on data and resource constraints. For HQDE, explain the modified small-image ResNet-18 actually used. Do not assume standard ImageNet preprocessing."
      ],
      [
        "Feature meaning",
        "Early layers often learn simple patterns, but a model can also learn acquisition shortcuts. Inspect errors and source generalization rather than assuming every learned feature is medically meaningful."
      ]
    ],
    "follow": [
      [
        "Why not use a vision transformer?",
        "It is a valid comparison when suitable pretraining, data, and hardware support it. Compare matched evaluation, latency, memory, and training cost. Architecture popularity is not evidence of suitability."
      ]
    ],
    "mistake": "A skip connection needs compatible tensor dimensions or an appropriate projection.",
    "source": "Role-based preparation prediction",
    "id": "essential-14"
  },
  {
    "group": "Models & PyTorch",
    "level": "Intermediate",
    "title": "When would you use U-Net, and how would you evaluate segmentation?",
    "answer": [
      "U-Net uses an encoder for context and a decoder for spatial predictions. Skip connections provide higher-resolution encoder features to the decoder. It is a useful segmentation baseline when pixel annotations exist.",
      "I would preserve image-mask alignment and choose outputs and losses that match the annotation. I would evaluate both spatial overlap and the downstream purpose, such as separate-cell counting."
    ],
    "sections": [
      [
        "Losses",
        "Cross-entropy evaluates pixel-class predictions. Dice-based losses emphasize overlap and can help with small foreground regions. Their usefulness depends on the task and implementation. Define how empty masks are handled."
      ],
      [
        "Metrics",
        "Dice = 2×intersection/(predicted area + true area). IoU = intersection/union. Boundary quality and missed small objects can require additional analysis."
      ],
      [
        "Instances",
        "Semantic segmentation labels pixels by class but can merge touching cells. Instance segmentation or suitable postprocessing is needed when individual objects must be separated."
      ]
    ],
    "follow": [
      [
        "Can high Dice coexist with wrong cell counts?",
        "Yes. A merged region can overlap the correct foreground while joining several cells. Evaluate object-level detection and counting if that is the intended output."
      ]
    ],
    "mistake": "A segmentation heatmap is not evidence that a slide-level diagnosis is correct.",
    "source": "Role-based preparation prediction",
    "id": "essential-15"
  },
  {
    "group": "Models & PyTorch",
    "level": "Basic",
    "title": "Which loss, labels, and output shapes would you use?",
    "answer": [
      "For ordinary multiclass classification, CrossEntropyLoss accepts raw logits shaped N×C and integer class labels shaped N. Each example has one class.",
      "For binary or multilabel outputs, BCEWithLogitsLoss can use floating-point targets with compatible shapes. The distinction is whether classes are mutually exclusive or several labels can be true at once."
    ],
    "sections": [
      [
        "Logits and probabilities",
        "A logit is a score before the output probability transformation. CrossEntropyLoss combines the needed log-softmax operation with the loss, so do not apply softmax first in the standard setup."
      ],
      [
        "Data types",
        "Check label dtype, class index range, batch dimension, and device. Shape-compatible code can still encode the wrong target. Inspect a batch and test a small known example."
      ],
      [
        "Task-specific outputs",
        "Segmentation adds spatial dimensions. Multi-task projects have separate heads and losses. State the exact contract for each head rather than using one loss indiscriminately."
      ]
    ],
    "follow": [
      [
        "Can binary classification use two logits?",
        "Yes. A two-class multiclass formulation is valid. Explain the chosen convention and keep loss, labels, and threshold interpretation consistent."
      ]
    ],
    "mistake": "A decreasing loss does not prove that labels or metrics are correct.",
    "source": "Role-based preparation prediction",
    "id": "essential-16"
  },
  {
    "group": "Models & PyTorch",
    "level": "Intermediate",
    "title": "Explain the training loop, evaluation mode, and fine-tuning.",
    "answer": [
      "The training loop transfers a batch, clears gradients, computes logits and loss, runs backward, and applies the optimizer update. Gradients accumulate by default, so zero_grad is required unless accumulation is intentional.",
      "Evaluation uses the correct module mode and disables unnecessary gradient recording. model.eval() and no_grad() do different jobs: eval changes training-dependent behaviour, while no_grad disables graph recording in its scope."
    ],
    "sections": [
      [
        "Core sequence",
        "model.train(); optimizer.zero_grad(); logits = model(images); loss = criterion(logits, labels); loss.backward(); optimizer.step(). Verify trainable parameters are included in the optimizer."
      ],
      [
        "Fine-tuning",
        "Replace the task head and establish a frozen-backbone baseline. Compare selective fine-tuning with suitable learning rates. Use the pretrained model’s input processing unless you explicitly evaluate a change."
      ],
      [
        "Batch normalization",
        "Freezing parameters does not automatically freeze running statistics. A frozen backbone in training mode can still update its batch-normalization state. Decide the intended behaviour explicitly."
      ]
    ],
    "follow": [
      [
        "What does backward do compared with step?",
        "backward calculates gradients through the computation graph. step uses those gradients to update parameters. Neither automatically sets evaluation mode or clears the next batch’s gradients."
      ]
    ],
    "mistake": "Do not update batch-normalization statistics on test data accidentally.",
    "source": "Role-based preparation prediction",
    "id": "essential-17"
  },
  {
    "group": "Models & PyTorch",
    "level": "Intermediate",
    "title": "How would you debug loss that does not decrease or a shape error?",
    "answer": [
      "I would reproduce the failure on a small input. Then I would inspect image ranges, labels, tensor shapes, loss choice, trainable parameters, gradients, and optimizer settings.",
      "I would try to overfit a tiny batch. Failure suggests a basic pipeline or optimization issue before the question of generalization. I would change one relevant factor at a time and record the result."
    ],
    "sections": [
      [
        "Shape failures",
        "Write the expected axes at each boundary: batch, channel, height, width, or sequence. reshape changes interpretation of the existing order; permute changes axis order. Do not add dimensions only to silence an exception."
      ],
      [
        "Gradient failures",
        "Check accidental detach, no_grad around training, frozen parameters, and optimizer parameter lists. Inspect finite loss and gradient magnitudes. Avoid retaining computation graphs in logging containers."
      ],
      [
        "Optimization failures",
        "A learning rate can be too large or too small. A mismatched target or incorrect normalization can make a working optimizer ineffective. Compare a known working baseline before adding complexity."
      ]
    ],
    "follow": [
      [
        "What if both training and validation accuracy are poor?",
        "Investigate underfitting, optimization, representation suitability, label quality, and preprocessing. Extra regularization is not the first automatic response."
      ]
    ],
    "mistake": "A sequence of untracked changes can hide the cause and prevent reproduction.",
    "source": "Role-based preparation prediction",
    "id": "essential-18"
  },
  {
    "group": "Deployment & reliability",
    "level": "Advanced",
    "title": "How would you measure GPU performance and reduce inference latency?",
    "answer": [
      "I would profile the whole pipeline: file access, decoding, preprocessing, host-to-device transfer, model execution, and postprocessing. A fast neural-network kernel does not guarantee a fast user workflow.",
      "I would measure on the target hardware with recorded batch size, input shape, runtime, and precision. I would warm up the model and synchronize appropriately when timing asynchronous GPU work."
    ],
    "sections": [
      [
        "Latency versus throughput",
        "Latency is the time for a request or case. Throughput is the amount completed per unit time. Batching can improve throughput while increasing waiting time or memory. Choose measurements for the actual workflow."
      ],
      [
        "Data bottlenecks",
        "DataLoader workers and suitable pinned memory can help overlap work. More workers are not always faster. Inspect decoding, storage contention, CPU use, and memory before changing the model."
      ],
      [
        "Memory failures",
        "Separate parameters, activations, optimizer state, and retained graphs. Consider smaller batches, mixed precision, or checkpointing when appropriate. Emptying cached memory does not free live tensors."
      ]
    ],
    "follow": [
      [
        "Does a smaller model file guarantee faster inference?",
        "No. Operator support, memory movement, runtime overhead, and hardware determine actual latency. Measure the complete deployment."
      ]
    ],
    "mistake": "Timing only the return of a Python call can miss GPU work that has not finished.",
    "source": "Role-based preparation prediction",
    "id": "essential-19"
  },
  {
    "group": "Deployment & reliability",
    "level": "Advanced",
    "title": "How do quantization, pruning, distillation, and export affect edge deployment?",
    "answer": [
      "Quantization changes numerical precision. Pruning removes selected weights or structures. Distillation trains a student using a teacher’s signals. These are different interventions and need separate measurements.",
      "After export or optimization, I would compare fixed reference inputs between the original and deployment pipelines. Then I would evaluate representative data and measure end-to-end latency and memory on the actual device."
    ],
    "sections": [
      [
        "Quantization choices",
        "Post-training quantization adapts a trained model and can require representative calibration data. Quantization-aware training models quantization effects during training. Check runtime and operator support."
      ],
      [
        "Pruning and distillation",
        "Unstructured sparsity may not accelerate a runtime without sparse-kernel support. A student should be compared with the same architecture trained directly, so the distillation benefit is isolated."
      ],
      [
        "Export checks",
        "Verify channel order, resize rules, normalization, labels, input shapes, operator compatibility, and precision. Define suitable numerical tolerances and compare final task metrics, not just one output."
      ]
    ],
    "follow": [
      [
        "Does HQDE’s 3.05× result establish edge speed?",
        "No. It concerns training-update payload. Inference optimization requires a separate device experiment."
      ]
    ],
    "mistake": "Successful export establishes file conversion, not equivalent behaviour or acceptable medical performance.",
    "source": "Role-based preparation prediction",
    "id": "essential-20"
  },
  {
    "group": "Deployment & reliability",
    "level": "Intermediate",
    "title": "How would you use Claude and debug failures that Claude cannot solve?",
    "answer": [
      "I would use Claude for bounded assistance, such as explaining an exception, reviewing a small function, or generating hypotheses. I would check the output against code, documentation, and an experiment.",
      "When suggestions fail, I would reduce the problem, reproduce it, inspect intermediate state, and test a specific hypothesis. The goal is evidence about the cause, not repeated prompt changes."
    ],
    "sections": [
      [
        "Data boundaries",
        "Use only material permitted by the organization. Do not upload patient images, identifiers, or private records without authorization. A local or approved workflow may be required."
      ],
      [
        "Verification",
        "Read generated code and identify assumptions. Add targeted assertions or checks that distinguish the suspected failure from alternatives. Record configuration and results so another person can reproduce the conclusion."
      ],
      [
        "Own the explanation",
        "Be prepared to explain the algorithm, shapes, failure modes, and trade-offs without relying on the generated response. A working notebook is not evidence that the pipeline is understood."
      ]
    ],
    "follow": [
      [
        "What if Claude gives confident but wrong advice?",
        "Treat confidence as irrelevant to correctness. Find the smallest test or primary reference that can verify the claim, then accept or reject it based on evidence."
      ]
    ],
    "mistake": "Generated code and model agreement are not experimental validation.",
    "source": "Role-based preparation prediction",
    "id": "essential-21"
  },
  {
    "group": "Company & workflow",
    "level": "Advanced",
    "title": "How would you stop inadequate slides from receiving a reassuring result?",
    "answer": [
      "This paraphrases one scenario in Vyuhaa’s older published screening form. My suggested answer separates input adequacy from diagnostic prediction. A failed input-quality check should not become a negative diagnostic result.",
      "I would define quality and relevance checks, an explicit unable-to-assess state, and a practical recapture or review route. I would test false acceptance of invalid images and false rejection of valid images."
    ],
    "sections": [
      [
        "Quality checks",
        "Possible checks include focus, exposure, specimen relevance, and sample adequacy. Their thresholds need representative validation. A single blur score cannot establish that a slide is diagnostically suitable."
      ],
      [
        "Workflow and misuse",
        "Track sample identity and repeated suspicious submissions. Make failed checks understandable to legitimate users. Reporting controls and audit records can reduce misuse without making recapture unnecessarily difficult."
      ],
      [
        "Failure behaviour",
        "A system should distinguish inadequate input, uncertain prediction, and a negative prediction. Define what remains available during device failure or interruption and who reviews unresolved cases."
      ]
    ],
    "follow": [
      [
        "Can misuse be made impossible?",
        "I would not promise that. I would describe the threats, prevention controls, detection signals, and remaining failure cases, then evaluate the controls."
      ]
    ],
    "mistake": "This is a published application scenario with a suggested answer. It is not a verified previous-candidate interview question.",
    "source": "Older Vyuhaa internship form, paraphrased; answer is a preparation suggestion.",
    "id": "essential-22"
  },
  {
    "group": "Project: HQDE",
    "level": "Basic",
    "title": "Explain HQDE in one minute.",
    "answer": [
      "My dissertation, Hierarchical Quantized Distributed Ensemble, studies two related questions. Can independently trained image models improve classification through an ensemble? Can synchronized workers exchange smaller updates while remaining close to a full-precision control?",
      "I implemented the learning workflow with PyTorch and stateful Ray workers. Independent mode keeps separate models and averages their logits. Synchronized mode starts from a common reference, aggregates local model deltas, and broadcasts the updated state.",
      "The final benchmark covered five image datasets. Independent HQDE exceeded the centralized baseline on four datasets. The largest gain was 2.62 percentage points on CIFAR-100. Quantized FedAvg reduced counted update payload by about 3.05×. These are separate results, and the ensemble comparison was not compute-matched."
    ],
    "sections": [
      [
        "Data flow",
        "The experiment runner prepares data and configuration. The manager creates workers and assigns batches. Each worker retains its model, optimizer, scheduler, and device state. The manager resolves outputs when aggregation requires all workers."
      ],
      [
        "Contribution",
        "Ray supplies actor lifetime, object references, and scheduling. HQDE supplies batch allocation, training modes, aggregation, prediction fusion, local normalization policy, quantization, and reporting."
      ],
      [
        "Scope",
        "The experiments establish benchmark behaviour under recorded settings. They do not establish performance on pathology images or production networks."
      ]
    ],
    "follow": [
      [
        "What is your main contribution?",
        "The contribution is the implemented and evaluated workflow for these learning modes and update compression. I would identify the modules I wrote and show a reproducible run. I would not claim to have invented ensembles, Ray, or FedAvg."
      ],
      [
        "Why is this relevant to Vyuhaa?",
        "The transferable work is image-model training, reproducible evaluation, distributed execution, and measurement of resource trade-offs. Adapting it to pathology would require a new data and evaluation protocol."
      ]
    ],
    "mistake": "Prepare the exact source modules and commits you authored. Keep the final controlled benchmark separate from historical single-run ablations.",
    "source": "M.Tech dissertation, Chapters 5–6; ML/AI Research résumé.",
    "id": "essential-23"
  },
  {
    "group": "Project: HQDE",
    "level": "Intermediate",
    "title": "Why did you use five image datasets?",
    "answer": [
      "I used MNIST, Fashion-MNIST, SVHN, CIFAR-10, and CIFAR-100. They cover grayscale digits, grayscale clothing, natural digit images, and colour object classification with different class counts.",
      "The controlled HQDE benchmark used a modified small-image ResNet-18, 20 epochs, four workers, batch size 128, automatic mixed precision, and seeds 42, 43, and 44. The recorded environment had two Tesla T4 GPUs.",
      "Centralized and independent training used the full training dataset. Synchronized runs used non-IID worker partitions with Dirichlet concentration 0.5. I compare compressed and uncompressed FedAvg using matched dataset and seed configurations."
    ],
    "sections": [
      [
        "Why several datasets?",
        "A method can behave differently near an accuracy ceiling and on a harder classification task. The dataset spread tests whether the observed behaviour is limited to one case. It is not a substitute for medical-domain evaluation."
      ],
      [
        "Preprocessing boundary",
        "The thesis establishes a modified small-image backbone. The exact transforms, normalization constants, validation split, and optimizer settings must come from the final runner. Do not substitute ImageNet defaults without checking."
      ]
    ],
    "follow": [
      [
        "Why was MNIST not improved?",
        "The centralized result was already 99.34 ± 0.06%, while the independent ensemble was 99.30 ± 0.04%. The task leaves little headroom, and that small difference does not support a broad advantage for either method."
      ],
      [
        "Did all methods see identical data?",
        "Centralized and independent training used the full dataset, while synchronized training used non-IID allocations. The modes answer different questions. The matched FP32-versus-quantized comparison is the appropriate compression control."
      ]
    ],
    "mistake": "Read the final runner for transforms, optimizer, learning rate, and validation policy. Do not mix the ten-worker table with the four-worker benchmark.",
    "source": "Dissertation §6.1 and Table 6.2.",
    "id": "essential-24"
  },
  {
    "group": "Project: HQDE",
    "level": "Intermediate",
    "title": "How do independent ensembles differ from FedAvg in HQDE?",
    "answer": [
      "In independent mode, I train four complete models without exchanging their parameters. The training stream is replicated across workers. Small learning-rate and dropout variations encourage different optimization paths.",
      "At prediction time, each worker receives the same input and returns class logits. The primary benchmark uses their unweighted mean. In synchronized mode, workers instead begin from one reference model and perform local training. At each epoch boundary, the coordinator forms sample-weighted updates and broadcasts the new reference state."
    ],
    "sections": [
      [
        "Ensemble equation",
        "For class c, the final score is the mean of worker logits for c. The predicted class is the largest mean score. The individual parameter sets remain separate."
      ],
      [
        "FedAvg equation",
        "For worker k, define delta_k = local_parameters_k − reference_parameters. Apply the sample-weighted mean delta to the reference. The weights are local sample counts divided by the total count."
      ],
      [
        "Synchronization",
        "Asynchronous dispatch does not remove aggregation barriers. The manager must collect the required worker responses before a dependent server update or fused prediction."
      ]
    ],
    "follow": [
      [
        "Why not weight models by training accuracy?",
        "A worker can fit local data well and generalize poorly. The final benchmark uses an unweighted mean rather than treating training efficiency as validated evidence of predictive quality."
      ],
      [
        "Are mean logits and mean probabilities the same?",
        "No. Softmax is nonlinear, so averaging logits and averaging probabilities are different prediction rules. My final benchmark uses mean logits."
      ]
    ],
    "mistake": "Confirm the exact worker variation settings before quoting their values.",
    "source": "Dissertation §§5.2–5.5.",
    "id": "essential-25"
  },
  {
    "group": "Project: HQDE",
    "level": "Advanced",
    "title": "What did your 3.05× communication result measure?",
    "answer": [
      "I measured the original update payload and the transmitted representation across workers and rounds. The quantized path included integer codes, one scale per block, full-precision warmup traffic, and excluded-tensor traffic.",
      "Across the five datasets, roughly 3407–3421 MB of original model deltas became 1114–1123 MB of transmitted payload. That gives about 3.05× run-wide compression. The final round reached about 7.93×, but that is not the ratio for the complete run.",
      "Ray headers, transport headers, and scheduler messages were outside this accounting. Quantized training was slower in these recorded experiments because compression and reconstruction added local work."
    ],
    "sections": [
      [
        "Matched comparison",
        "Compare quantized FedAvg with FP32 FedAvg under the same dataset and seed. Do not compare compression accuracy with the independent ensemble and attribute the difference to quantization."
      ],
      [
        "Compression calculation",
        "Run-wide ratio = sum(original bytes) / sum(transmitted bytes). Do not average per-round ratios when the byte totals differ."
      ],
      [
        "Precision policy",
        "The controlled run used two warmup rounds, base/minimum/maximum widths of 8/4/16 bits, block size 1024, and error feedback."
      ]
    ],
    "follow": [
      [
        "Why is the overall ratio below the final-round ratio?",
        "Warmup and skipped tensors still consume larger representations. Their traffic remains part of the total, even if later eligible blocks use fewer bits."
      ],
      [
        "Did compression improve accuracy?",
        "The observed mean changes ranged from −0.19 to +0.38 percentage points. The defensible claim is payload reduction while tracking the matched control, not a generalization benefit from compression."
      ]
    ],
    "mistake": "Explain that this is model-payload accounting, not a network packet capture.",
    "source": "Dissertation §5.6 and Table 6.9.",
    "id": "essential-26"
  },
  {
    "group": "Project: HQDE",
    "level": "Advanced",
    "title": "How does error feedback work in your quantization pipeline?",
    "answer": [
      "I quantize a model delta after adding the residual from the previous round. The quantizer splits eligible tensors into blocks, chooses a permitted precision, and calculates a scale for each block.",
      "It rounds and clips the scaled values into codes, then reconstructs the approximation used for aggregation. The difference between the corrected input and the reconstruction becomes the residual for a later update.",
      "This mechanism carries forward information lost through approximation. It does not guarantee that every compressed training configuration converges or outperforms full precision."
    ],
    "sections": [
      [
        "Error-feedback equations",
        "u_t = delta_t + residual_(t−1). Reconstruct u_hat_t from the transmitted representation. Set residual_t = u_t − u_hat_t. Keep the residual associated with the worker and parameter."
      ],
      [
        "Why blocks?",
        "A local scale can represent a block more closely than a single scale over a tensor with very different magnitudes. Additional blocks also require scale metadata and computation."
      ],
      [
        "What is excluded?",
        "The thesis excludes counters, small tensors, selected bias and normalization values, and batch-normalization running state from the ordinary quantized path. Preserve their required dtype and state semantics."
      ]
    ],
    "follow": [
      [
        "Why have warmup?",
        "The schedule begins with full precision before moving toward lower configured widths. It is a design choice evaluated in the recorded setup. A no-warmup ablation would test its contribution."
      ],
      [
        "What must a checkpoint contain?",
        "To resume this method faithfully, preserve model, optimizer, scheduler, reference state, round information, normalization policy, and quantization residuals as required by the configuration."
      ]
    ],
    "mistake": "Check zero-valued block handling and exact clipping in the implementation.",
    "source": "Dissertation §5.6, Algorithm 4.",
    "id": "essential-27"
  },
  {
    "group": "Project: HQDE",
    "level": "Advanced",
    "title": "Was the ensemble improvement a fair comparison?",
    "answer": [
      "The ensemble improved CIFAR-100 accuracy from 74.27 ± 0.40% to 76.89 ± 0.21%, a gain of 2.62 percentage points. On CIFAR-10, the corresponding result was 93.31 ± 0.05% versus 94.25 ± 0.08%.",
      "Those results compare a single centralized model with four independently trained models. They are not equal-total-compute comparisons. The models could overlap execution on two GPUs, so a shorter elapsed time is not proof of less total computation.",
      "A stronger follow-up would compare an ordinary deep ensemble and HQDE under matched architecture, model count, training budget, and hardware. That would help isolate whether the configured worker variation adds value."
    ],
    "sections": [
      [
        "Diversity evidence",
        "For CIFAR-100, mean worker accuracy was 73.87%, while the ensemble reached 76.89%. Disagreement was 19.96%. Complementary errors can help, but disagreement alone does not establish quality."
      ],
      [
        "Oracle limitation",
        "Oracle accuracy counts an example as correct if any worker is correct. It uses the true label to identify success. It is a diagnostic upper bound for the available predictions, not a deployable accuracy result."
      ]
    ],
    "follow": [
      [
        "What was the oracle accuracy?",
        "The CIFAR-100 diversity table reports 84.18%. That identifies headroom in the predictions, not the accuracy delivered by the fusion rule."
      ],
      [
        "Did confidence improve too?",
        "Not uniformly. The thesis notes that CIFAR-10 accuracy and negative log-likelihood improved while expected calibration error was higher. Accuracy and calibration are distinct."
      ]
    ],
    "mistake": "Identify each result table before comparing numbers from different experiments.",
    "source": "Dissertation Tables 6.2 and 6.10; §6.7.",
    "id": "essential-28"
  },
  {
    "group": "Project: EvidenceMem",
    "level": "Basic",
    "title": "Explain EvidenceMem in one minute.",
    "answer": [
      "EvidenceMem asks whether a compact memory over a frozen image representation can classify images, expose its retrieved examples, and accept new classes without retraining the encoder.",
      "I use OpenCLIP image and text embeddings. I cluster labelled training embeddings within each class and store real examples near cluster centres. A query retrieves similar representatives. The classifier combines visual scores with text-label similarity.",
      "At 200 stored representatives, the fused method reached 89.58 ± 0.11% on CIFAR-10. It improved on zero-shot CLIP, but a trained linear probe reached 93.84%. The project therefore supports a memory-and-update trade-off, not an accuracy replacement for a trained head."
    ],
    "sections": [
      [
        "Construction path",
        "Training images → frozen normalized embeddings → class-wise clusters → real representatives → index and metadata. Class names also produce text representations."
      ],
      [
        "Prediction path",
        "Query image → normalized embedding → exact similarity search → visual class scores and text scores → validation-selected fusion → prediction and confidence signals."
      ],
      [
        "Contribution boundary",
        "CLIP, FAISS, clustering, and kNN are existing methods. The project implements and evaluates their combination in a compact, inspectable, updateable memory."
      ]
    ],
    "follow": [
      [
        "Why not just train a classifier?",
        "A trained linear probe is stronger on accuracy in my experiments. I would choose it if accuracy were the only requirement. EvidenceMem investigates class insertion and inspectable retrieval under a memory budget."
      ],
      [
        "Why is this relevant to pathology?",
        "The transferable work is representation evaluation, limited-support classification, and error analysis. Pathology suitability remains a separate hypothesis."
      ]
    ],
    "mistake": "Do not call the method clinically validated.",
    "source": "EvidenceMem retained README: idea, protocol, results, and limitations.",
    "id": "essential-29"
  },
  {
    "group": "Project: EvidenceMem",
    "level": "Intermediate",
    "title": "Why store real representatives near cluster centres?",
    "answer": [
      "I wanted a memory that stores several visual modes per class and can show real supporting images. One class mean loses within-class variation. Full kNN retains all training embeddings.",
      "I apply MiniBatchKMeans within each class. For each cluster, I select a real training embedding near the normalized cluster centre. The stored representative can therefore be displayed beside a query.",
      "At the default CIFAR-10 budget, the memory has 20 representatives per class and 200 in total. It retains 0.44% of the 45,000 training examples as stored representatives. The full training split is still used to construct that memory."
    ],
    "sections": [
      [
        "Why class-wise clustering?",
        "Each known class receives representatives. Global clustering could allocate most memory to frequent or visually dominant groups and leave some classes poorly represented."
      ],
      [
        "What reliability measures",
        "Compactness measures within-cluster similarity. Purity measures agreement with nearby training labels. Text alignment measures similarity to a class-text representation. These are heuristics, not guaranteed correctness scores."
      ],
      [
        "Version-specific settings",
        "The retained notebook uses reliability weights 0.45, 0.35, and 0.20. The package defaults are 0.40, 0.40, and 0.20. Quote the setting for the result being discussed."
      ]
    ],
    "follow": [
      [
        "Did reliability improve the visual classifier?",
        "Not at the default memory budget. Visual-only EvidenceMem reached 85.31%, while plain KMeans representatives reached 86.09%. That limits the claim for the reliability formula."
      ],
      [
        "Could rare abnormal patterns be lost?",
        "Yes. A centre-based representative can miss rare modes. For pathology, I would measure coverage of rare findings and consider explicit representation or sampling constraints."
      ]
    ],
    "mistake": "Do not describe representative selection as exact global k-medoids optimization.",
    "source": "EvidenceMem README: memory construction and reliability ablation.",
    "id": "essential-30"
  },
  {
    "group": "Project: EvidenceMem",
    "level": "Advanced",
    "title": "How does a query become a prediction?",
    "answer": [
      "I first apply the encoder’s preprocessing, compute the query embedding, and normalize it. I use exact inner-product search in FAISS, with a deterministic NumPy fallback.",
      "I aggregate retrieved visual evidence by class and compute query-to-class-text scores. The completed notebook combines them as S(c) = (1 − alpha) × S_visual(c) + alpha × S_text(c). I select retrieval depth and the fusion weight on validation data.",
      "The notebook searches neighbour counts 5, 10, 20, 50, and 100. The text-weight grid is 0.0, 0.1, 0.25, 0.5, 0.75, 0.9, and 1.0. Temperature is also selected on validation data rather than test labels."
    ],
    "sections": [
      [
        "Why exact search?",
        "At a small prototype budget, exact search provides a clear reference without approximate-search recall errors. Approximate indexing would need a separate scale and latency experiment."
      ],
      [
        "Naming trap",
        "Notebook alpha is the text weight. The package fusion_weight is the visual weight. Notebook alpha = 0.25 corresponds to package fusion_weight = 0.75."
      ],
      [
        "Reproducibility",
        "Retain the same embedding arrays and split indices across compared methods. Record the selected configuration separately for each experiment."
      ]
    ],
    "follow": [
      [
        "What prevents test leakage?",
        "Memory construction uses training data. Hyperparameters and temperature use validation data. The test set evaluates the fixed pipeline."
      ],
      [
        "How do you choose k?",
        "I compare the recorded candidate values on validation data. A larger k can include irrelevant neighbours; a small k can be sensitive to individual representatives."
      ]
    ],
    "mistake": "Check the exact score aggregation and selected best values in the result notebook. The search grid is not the selected configuration.",
    "source": "EvidenceMem README: retrieve and classify; protocol.",
    "id": "essential-31"
  },
  {
    "group": "Project: EvidenceMem",
    "level": "Intermediate",
    "title": "What did the 89.58% result establish?",
    "answer": [
      "The fused method reached 89.58 ± 0.11% mean CIFAR-10 accuracy across three seeds. Zero-shot CLIP reached 85.25%, and plain KMeans representatives reached 86.09%.",
      "The improvement over zero-shot CLIP is 4.33 percentage points. The improvement over plain representatives is 3.48 points. However, the linear probe reached 93.84%, so EvidenceMem remained 4.31 points behind it.",
      "The ablation indicates that visual–text fusion drives the main gain. The full reliability-weighted visual-only method did not beat plain representatives at the default budget. I would present that negative result as part of the research conclusion."
    ],
    "sections": [
      [
        "Uncertainty",
        "The 0.11 value is the standard deviation over seeds 7, 17, and 29. It is not a confidence interval. The supervised ResNet-18 comparison was one run, not a three-seed result."
      ],
      [
        "Additional evidence",
        "CIFAR-100 fused accuracy was 66.73 ± 0.20%, versus 63.18% zero-shot and 74.85% linear probe. The gap to a trained head grows on that task."
      ],
      [
        "Interpretation",
        "Results support useful fusion gains and memory operations. They do not establish that the method is the best classifier or that every component contributes positively."
      ]
    ],
    "follow": [
      [
        "Why keep the project if a linear probe wins?",
        "The research question includes retrieval, compact memory, and class insertion. I would be explicit that these capabilities have an accuracy trade-off and should be chosen only when useful."
      ],
      [
        "What would you improve next?",
        "A targeted next experiment would redesign or remove reliability weighting while preserving a fixed memory budget and the same encoder and split."
      ]
    ],
    "mistake": "Describe all baselines, not only the weakest comparison.",
    "source": "EvidenceMem README: classification tables and ablation.",
    "id": "essential-32"
  },
  {
    "group": "Project: EvidenceMem",
    "level": "Advanced",
    "title": "What did your OOD experiments show?",
    "answer": [
      "For CIFAR-10 classification, the retained experiment uses CIFAR-100 test images as near-OOD data and SVHN test images as far-OOD data. Each OOD set has 10,000 examples.",
      "I compare maximum text probability, maximum prototype similarity, fused probability, predictive entropy, probability margin, and a disagreement-aware score. Predictive entropy is the strongest tested signal in both recorded cases.",
      "For near-OOD CIFAR-100, predictive entropy has AUROC 90.72 and FPR95 52.01. For SVHN, the values are 99.11 and 1.11. The large near-OOD FPR95 shows why a good-looking aggregate metric does not establish reliable rejection."
    ],
    "sections": [
      [
        "Metric interpretation",
        "AUROC measures ranking across thresholds. FPR95 measures a false-positive rate at a defined 95% true-positive operating point. Verify which examples are positive and how scores are oriented before explaining it."
      ],
      [
        "Negative result",
        "The disagreement-aware score did not beat predictive entropy. Its go/no-go condition failed. It should not be promoted as an improved rejection mechanism."
      ],
      [
        "Medical transfer",
        "Unknown classes, scanner changes, and poor image quality are different failure sources. A natural-image OOD result does not establish medical-input safety."
      ]
    ],
    "follow": [
      [
        "Why not trust maximum softmax probability?",
        "A model can be confident on unfamiliar inputs. I compare explicit rejection signals and operating points instead of interpreting a large score as certainty."
      ],
      [
        "Would you deploy the current OOD mechanism?",
        "I would first define the deployment failure classes and acceptable behaviour, then evaluate those conditions with domain data. The retained experiment alone is insufficient."
      ]
    ],
    "mistake": "Check metric orientation in the notebook before defining FPR95.",
    "source": "EvidenceMem README: out-of-distribution detection table.",
    "id": "essential-33"
  },
  {
    "group": "Project: EvidenceMem",
    "level": "Advanced",
    "title": "How can EvidenceMem forget old classes when the encoder is frozen?",
    "answer": [
      "The insertion experiment starts with classes 0–5 and adds classes 6–9 from small labelled support sets. The encoder and old representatives remain unchanged. However, new representatives compete with old ones during search and classification.",
      "With one support example per new class, overall accuracy was 76.90% and recorded old-class forgetting was 10.94 points. With 25 examples, overall accuracy was 86.29%, new-class accuracy was 89.08%, and forgetting was 3.74 points.",
      "The result shows fast insertion without encoder retraining. It does not show zero forgetting."
    ],
    "sections": [
      [
        "Why forgetting occurs",
        "The classifier is more than its encoder parameters. Its memory and available labels change. A query previously assigned to an old class can now receive a higher score for a new class."
      ],
      [
        "What to evaluate",
        "Report old-class accuracy, new-class accuracy, overall performance, memory cost, and insertion time. One combined accuracy can hide damage to old classes."
      ]
    ],
    "follow": [
      [
        "How would you improve retention?",
        "A proposed experiment could compare balanced memory allocation, support-set selection, and fusion recalibration. Keep a fixed evaluation set and measure old and new classes separately."
      ],
      [
        "Was insertion slow?",
        "The retained table reports mean insertion times from 0.015 seconds at one shot to 0.051 seconds at 25 shots. State the recorded hardware and timing scope before extrapolating."
      ]
    ],
    "mistake": "Check how forgetting is calculated in the notebook before writing its formula.",
    "source": "EvidenceMem README: class insertion table.",
    "id": "essential-34"
  },
  {
    "group": "Other research projects",
    "level": "Intermediate",
    "title": "How would you explain PsychoTA’s silver labels?",
    "answer": [
      "PsychoTA models several aspects of a dialogue jointly: ego state, transaction type, stroke type, and speaker life position. I built heuristic silver-label preparation and a joint training pipeline.",
      "Silver labels are automatically produced labels rather than fully verified expert judgments. They make a training experiment possible, but they can contain systematic errors.",
      "I would distinguish performance against those labels from evidence that the model understands the intended psychological constructs. Stronger validation would require an appropriate independently reviewed evaluation set."
    ],
    "sections": [
      [
        "Data questions to expect",
        "The interviewer can ask for the original corpus, licence, sample counts, class balance, label rules, and split unit. Those details are not established by the available résumé and must be checked in your records."
      ],
      [
        "Leakage risk",
        "Utterances from one conversation share context and speakers. Splitting individual utterances randomly can overstate generalization. Explain the actual split used, then propose a conversation-level evaluation if needed."
      ],
      [
        "Bias risk",
        "A model can reproduce the heuristics rather than learn a valid construct. Inspect errors by rule and compare against an independent reference where available."
      ]
    ],
    "follow": [
      [
        "Did you use expert labels?",
        "The available résumé establishes heuristic silver labels. Do not claim expert annotation or clinical validation unless you have the corresponding records."
      ],
      [
        "Why is this relevant to medical data?",
        "Both domains require careful label provenance. The lesson is to distinguish convenient labels from reliable ground truth and make annotation uncertainty explicit."
      ]
    ],
    "mistake": "Confirm corpus name, counts, rule definitions, split policy, and whether any independent review occurred.",
    "source": "ML/AI Research résumé. Detailed dataset and metric records were not available in the reviewed material.",
    "id": "essential-35"
  },
  {
    "group": "Other research projects",
    "level": "Intermediate",
    "title": "How did TRACE use SHAP and prevent target leakage?",
    "answer": [
      "TRACE is an academic AI and analytics pipeline. My résumé describes semantic grading, confidence scoring, anomaly detection, dropout-risk classification, and retrieval-based resource matching within a 15-component system.",
      "The pipeline integrates OCR, model-consistency checks, SHAP explanations, and human approval thresholds. I would explain each component’s input and output and distinguish trained models from rules, retrieval, and external model calls.",
      "For the predictive component, I need to define what outcome is predicted and when the prediction occurs. Features recorded after that point can leak the outcome. The hackathon win is an achievement, not evidence of predictive validity."
    ],
    "sections": [
      [
        "Feature-selection discussion",
        "Name the actual input columns and missing-data policy. Explain why each feature is available at prediction time. Compare a simple baseline and fit transformations only on training data."
      ],
      [
        "Explanation discussion",
        "SHAP attributes the selected model’s prediction relative to a reference. It does not prove why a student’s outcome occurred. Identify which model was explained and show an example."
      ],
      [
        "System failure discussion",
        "Incorrect OCR can corrupt downstream grading and analytics. A proposed resilient design records provenance, exposes uncertain extraction, and routes unsupported cases to review. Do not claim controls that were not implemented."
      ]
    ],
    "follow": [
      [
        "Which algorithm did you train?",
        "The available résumé does not establish the exact dropout-risk estimator. Check the implementation and name that estimator, target, split, metric, and baseline. Do not infer XGBoost merely because it appears in your skills."
      ],
      [
        "How did you evaluate the whole pipeline?",
        "Separate extraction quality, grading agreement, predictive performance, retrieval quality, and human-review workload. If you only built an integrated demonstration, say that and identify what remains unvalidated."
      ]
    ],
    "mistake": "Confirm data provenance, estimator, target, split, metrics, calibration, and approval thresholds from the implementation.",
    "source": "AI Engineer résumé. Exact model and dataset settings require confirmation.",
    "id": "essential-36"
  }
];
