import deepFreeze from "deep-freeze";
import anecdoteReducer, { vote, createNewAnecdote } from "./anecdoteSlice";

const testAnecdote = {
    content: 'Test1',
    id: 1,
    votes: 0
}

const testAnecdote2 = {
    content: 'Test2',
    id: 2,
    votes: 0
}



describe('anecdoteReducer tests.', () => {
    test('Voting works.', () => {
        const initialAnecdotes = [testAnecdote]
        deepFreeze(initialAnecdotes)
        const voteAction = vote(testAnecdote.id)
        const newState = anecdoteReducer(initialAnecdotes, voteAction)

        expect(newState).toHaveLength(1)
        expect(newState[0].votes).toBe(1)
    })

    test('New note creation works.', () => {
        const initialAnecdotes = []
        deepFreeze(initialAnecdotes)
        const createNewAnecdoteAction = createNewAnecdote(testAnecdote.content)
        const newState = anecdoteReducer(initialAnecdotes, createNewAnecdoteAction)
        
        expect(newState.length).toBe(initialAnecdotes.length + 1)
        expect(newState[0].content).toBe(testAnecdote.content)
    })

    test('Anecdotes are ordered by votes', () => {
        const initialAnecdotes = [testAnecdote, testAnecdote2]
        deepFreeze(initialAnecdotes)
        const voteAction = vote(testAnecdote2.id)
        const newState = anecdoteReducer(initialAnecdotes, voteAction)
        expect(newState[0].content).toBe(testAnecdote2.content)
    })
})
