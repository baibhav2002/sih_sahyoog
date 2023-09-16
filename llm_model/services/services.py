

from services.src.plagiarsim_class import Similarity

def check_plagiarism(sentence1,sentence2):
    m  =  Similarity()
    r  =  float(m.similarity(sentence1 , sentence2))
    return r,r>=0.8,0.2