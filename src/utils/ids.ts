
// Whenever you add a new node type, you'll need to add the type here
const nodeTypesTuple = <const> [
    'Appointment',
    'Checkup',
    'Doctor',
    'Followup',
    'Patient',
    'Review',
    'Service',
    'User',
];

export type NodeType = typeof nodeTypesTuple[number]

const nodeTypes: string[] = nodeTypesTuple.map(value => value);

function isNodeType(type: string): type is NodeType {
    return nodeTypes.includes(type);
}

export function buildId(type: NodeType, id: string): string {
    const buffer = Buffer.from(`${type}:${id}`);
    return buffer.toString('base64');
}

export function deconstructId(id: string): [NodeType, string] | undefined {
    const buffer = Buffer.from(id, 'base64');
    const decoded = buffer.toString('ascii');
    const parts = decoded.split(':');
    if (parts.length !== 2) {
        return;
    }

    const typePart = parts[0];
    if (!isNodeType(typePart)) {
        return;
    }

    const idPart = parts[1];
    return [typePart, idPart];
}

export function nodeTypeFromId(id: string): NodeType | undefined {
    return deconstructId(id)?.[0];
}
