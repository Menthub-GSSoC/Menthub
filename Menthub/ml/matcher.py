import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class MentorMatcher:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        
    def match_mentors(self, mentee_profile, available_mentors):
        """
        Match a mentee with available mentors based on profile similarity
        
        Args:
            mentee_profile: Dict containing mentee information
            available_mentors: List of mentor objects
            
        Returns:
            List of mentors sorted by match score
        """
        if not available_mentors:
            return []
            
        # Create profiles for vectorization
        mentor_profiles = []
        for mentor in available_mentors:
            profile_text = f"{mentor.department} {mentor.bio or ''} {mentor.role}"
            mentor_profiles.append(profile_text)
        
        # Add mentee profile
        mentee_text = f"{mentee_profile.get('department', '')} {mentee_profile.get('bio', '')} {mentee_profile.get('role', '')}"
        all_profiles = mentor_profiles + [mentee_text]
        
        # Vectorize profiles
        try:
            tfidf_matrix = self.vectorizer.fit_transform(all_profiles)
            
            # Calculate similarity between mentee and all mentors
            mentee_vector = tfidf_matrix[-1]  # Last vector is mentee
            mentor_vectors = tfidf_matrix[:-1]  # All except last are mentors
            
            similarities = cosine_similarity(mentee_vector, mentor_vectors).flatten()
            
            # Create list of (mentor, score) tuples
            mentor_scores = list(zip(available_mentors, similarities))
            
            # Sort by similarity score (highest first)
            mentor_scores.sort(key=lambda x: x[1], reverse=True)
            
            return [mentor for mentor, score in mentor_scores]
            
        except Exception as e:
            print(f"Error in matching: {e}")
            # Return mentors in original order if matching fails
            return available_mentors
