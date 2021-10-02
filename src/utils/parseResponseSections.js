export const parseResponseSections = (sectionHeadings, text) => {
    var sections = []
    for (var i = 0; i < sectionHeadings.length; i++) {
        var regex = new RegExp('\\s+' + sectionHeadings[i] + ':?\\s+', 'g')
        var split = text.split(regex);
        if (split.length < 2) {
            regex = new RegExp(sectionHeadings[i] + ':?\\s+', 'g')
            split = text.split(regex);
        }
        if (split.length < 2) {
            regex = new RegExp('\\s+' + sectionHeadings[i] + ':?', 'g')
            split = text.split(regex);
        }
        // if (split.length != 2) {
        //     throw 'Could not find ' + sectionHeadings[i] + ' in the text.';
        // }

        var temp_text = split[1];
        if (i+1 < sectionHeadings.length) {
            var regex = new RegExp('\\s+' + sectionHeadings[i+1] + ':?\\s+', 'g')
            split = temp_text.split(regex);
            if (split.length < 2) {
                regex = new RegExp(sectionHeadings[i+1] + ':?\\s+', 'g')
                split = temp_text.split(regex);
            }
            if (split.length < 2) {
                regex = new RegExp('\\s+' + sectionHeadings[i+1] + ':?', 'g')
                split = temp_text.split(regex);
            }
            // if (split.length != 2) {
            //     throw 'Could not find ' + sectionHeadings[i+1] + ' in the text.';
            // }
            temp_text = split[0];
        }
        sections.push({ title: sectionHeadings[i], text: temp_text })
    }
    return sections;
}