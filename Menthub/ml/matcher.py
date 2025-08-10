def match_mentees_to_mentors(mentees, mentors):
    matches = []

    for mentee in mentees:
        for mentor in mentors:
            # Check for overlapping skills/interests and availability
            if set(mentee['interests']).intersection(mentor['skills']) and \
               set(mentee['availability']).intersection(mentor['availability']):
                matches.append((mentee['name'], mentor['name']))
    return matches
