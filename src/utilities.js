export function checkRequirements(characterObj) {
    const moves = Object.assign([], characterObj.moves)
    var possibleMoves = moves.filter((move) => {
        var pass = true
        move.requirements.forEach((requirement) => {
            if(!compare(characterObj[requirement[0]], requirement[1], requirement[2])){ pass = false }
        })
        if(characterObj.player !== true && move.currentCooldown && move.currentCooldown > 0) pass = false
        return pass
    })
    return possibleMoves
}

export function compare(post, operator, value) {
    switch (operator) {
      case '>':   return post > value;
      case '<':   return post < value;
      case '>=':  return post >= value;
      case '<=':  return post <= value;
      case '===': return post === value;
      case '!==': return post !== value;
      default: return false;
    }
  }

export function once(fn, context) { 
    console.log('once')
	var result;

	return function() { 
		if(fn) {
			result = fn.apply(context || this, arguments);
			fn = null;
		}

		return result;
	}
}