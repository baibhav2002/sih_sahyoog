from typing import List, Union
import numpy as np
from sentence_transformers import SentenceTransformer
from services.components.cos_similarity import cos_sim
from services.interface.abstract_model import PlagiarismDriver


class Similarity(PlagiarismDriver):
    def __init__(
            self,
            model_name_or_path="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2",
            device=None):
        if isinstance(model_name_or_path, str):
            self.plagiarism_model = SentenceTransformer(
                model_name_or_path,
                device=device
            )
        elif hasattr(model_name_or_path, "encode"):
            self.plagiarism_model = model_name_or_path
        else:
            raise ValueError("model_name_or_path is transformers model name or path")
    def _get_vector(
            self,
            sentences: Union[str, List[str]],
            batch_size: int = 64,
            show_progress_bar: bool = False,
    ) -> np.ndarray:
        """
        Returns the embeddings for a batch of sentences
        """
        return self.plagiarism_model.encode(sentences, batch_size=batch_size, show_progress_bar=show_progress_bar)

    def similarity(self, a: Union[str, List[str]], b: Union[str, List[str]]):
        """
        Compute similarity between two texts.
        """
        text_emb1 = self._get_vector(a)
        text_emb2 = self._get_vector(b)
        return cos_sim(text_emb1, text_emb2)