export class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    /**
     * Ajout d'un élément à la fin de la liste.
     * @param {*} valeur tout type
     */
    addLast(value) {
        let current = this.head;
        if (!current) {
            this.head = new Node(value);
        } else {
            while (current.next) {
                current = current.next;
            }
            current.next = new Node(value);
        }
        this.size++;
    }

    /**
     * Ajout d'un élément à la position donnée.
     * @param {number} position - index de la position à partir de 0
     * @param {*} value tout type
     */
    add(position, value) {
        if (position < 0 || position > this.size) {
            throw new Error('Index en dehors des limites');
        } else if (position === 0) {
            this.head = new Node(value, this.head);
        } else {
            let current = this.head;
            while (position - 1) {
                current = current.next;
                position--;
            }
            current.next = new Node(value, current.next);
        }
        this.size++;
    }

    /**
     * Ajout d'un élément au début de la liste.
     * @param {*} valeur tout type
     */
    addFirst(value) {
        this.head = new Node(value, this.head);
        this.size++;
    }

    /**
     * Récupère l'élément à la position donnée.
     * @param {number} position - index de la position à partir de 0
     */
    get(position) {
        if (position < 0 || position > this.size - 1) {
            return null;
        } else {
            let current = this.head;
            while (position) {
                current = current.next;
                position--;
            }
            return current;
        }
    }

    /**
     * Retourne si la valeur est présente ou non.
     * @param {*} valeur - tout type
     */
    contains(valeur) {
        let current = this.head;
        while (current) {
            if (Object.is(valeur, current.value)) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    /**
     * Supprime et retourne le dernier élément.
     * @return {*} valeur - tout type
     */
    removeLast() {
        let current = this.head;
        if (!current) {
            return null;
        } else if (!current.next) {
            this.head = null;
            this.size--;
            return current.value;
        } else {
            while (current.next.next) {
                current = current.next;
            }
            const lastNode = current.next;
            current.next = null;
            this.size--;
            return lastNode.value;
        }
    }

    /**
     * Supprime et retourne le premier élément.
     * @return {*} valeur - tout type
     */
    removeFirst() {
        let current = this.head;
        if (!current) {
            return null;
        } else {
            this.head = current.next;
            this.size--;
            return current.value;
        }
    }

    /**
     * Supprime l'élément à la position donnée.
     * @param {number} position - index de la position à partir de 0
     *
     * @return {*} valeur - tout type
     */
    remove(position) {
        if (position < 0 || position > this.size - 1) {
            throw new Error('Index en dehors des limites');
        } else if (position === 0) {
            return this.removeFirst();
        } else {
            let current = this.head;
            while (position - 1) {
                current = current.next;
                position--;
            }
            const nodeValue = current.next.value;
            current.next = current.next.next;
            this.size--;
            return nodeValue;
        }
    }

    /**
     * Vide la liste.
     */
    clear() {
        this.head = null;
        this.size = 0;
    }

    /**
     * Affiche la liste (fonctionne que sur Node.js).
     */
    print() {
        let current = this.head;
        while (current) {
            process.stdout.write(`${current.value} -> `);
            current = current.next;
        }
        console.log(null);
    }

    reverse() {
        let current = this.head;
        if (!current || !current.next) {
            return this;
        } else {
            let prev = null;
            while (current) {
                const next = current.next;
                current.next = prev;
                prev = current;
                current = next;
            }
            this.head = prev;
        }
        return this;
    }

    sort() {
        let current = this.head;
        if (!current || !current.next) {
            return;
        }
        if (current && current.next) {
            const sortedList = new LinkedList();
            sortedList.addFirst(current.value);
            current = current.next;
            while (current) {
                let sortedHead = sortedList.head;
                while (sortedHead.next && sortedHead.next.value < current.value) {
                    sortedHead = sortedHead.next;
                }
                if (sortedHead.value > current.value) {
                    sortedList.head = new Node(current.value, sortedHead);
                } else {
                    sortedHead.next = new Node(current.value, sortedHead.next);
                }
                current = current.next;
            }
            this.head = sortedList.head;
        }
        return this;
    }
}