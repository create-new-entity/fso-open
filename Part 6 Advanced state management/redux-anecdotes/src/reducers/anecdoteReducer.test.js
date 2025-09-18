import deepFreeze from "deep-freeze";
import anecdoteReducer, { vote } from "./anecdoteReducer";

const testAnecdote = {
    content: 'Test1',
    id: 1,
    votes: 0
}



describe('anecdoteReducer tests.', () => {
    test('Voting works', () => {
        const initialAnecdotes = [testAnecdote]
        deepFreeze(initialAnecdotes)
        const voteAction = vote(testAnecdote.id)
        const newState = anecdoteReducer(initialAnecdotes, voteAction)

        expect(newState).toHaveLength(1)
        expect(newState[0].votes).toBe(1)
    })
})
